import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertCASignatureSchema, insertEmailCampaignSchema, loginSchema, insertShareLinkSchema, insertShareLinkSubmissionSchema } from "@shared/schema";
import { z } from "zod";
import { emailService } from "./email-service";
import { smsService } from "./sms-service";
import bcrypt from "bcryptjs";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }
  next();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Authentication Routes
  
  // Login
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = loginSchema.parse(req.body);
      
      const user = await storage.getUserByEmail(email);
      if (!user) {
        res.status(401).json({ error: "Invalid email or password" });
        return;
      }
      
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        res.status(401).json({ error: "Invalid email or password" });
        return;
      }
      
      req.session.userId = user.id;
      req.session.userEmail = user.email;
      req.session.userName = user.name;
      
      res.json({ 
        user: { 
          id: user.id, 
          email: user.email, 
          name: user.name, 
          role: user.role 
        } 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid login data" });
      } else {
        console.error("Login error:", error);
        res.status(500).json({ error: "Login failed" });
      }
    }
  });
  
  // Logout
  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ error: "Logout failed" });
      } else {
        res.json({ success: true });
      }
    });
  });
  
  // Get current user session
  app.get("/api/auth/me", (req, res) => {
    if (req.session.userId) {
      res.json({
        authenticated: true,
        user: {
          id: req.session.userId,
          email: req.session.userEmail,
          name: req.session.userName
        }
      });
    } else {
      res.json({ authenticated: false });
    }
  });

  // Lead Management Routes
  
  // Create a new lead from contact form or external sources
  app.post("/api/leads", async (req, res) => {
    try {
      const validatedData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(validatedData);
      
      // Send welcome email and SMS, create campaign tracking
      try {
        await emailService.sendWelcomeEmail(lead);
        await smsService.sendWelcomeSMS(lead);
        await storage.createEmailCampaign({
          leadId: lead.id,
          step: 1,
          emailType: "welcome",
          status: "sent"
        });
      } catch (emailError) {
        console.error("Error sending welcome communications:", emailError);
        // Don't fail the lead creation if email/SMS fails
      }
      
      res.json(lead);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid lead data", details: error.errors });
      } else {
        console.error("Error creating lead:", error);
        res.status(500).json({ error: "Failed to create lead" });
      }
    }
  });
  
  // Get all leads for dashboard
  app.get("/api/leads", async (req, res) => {
    try {
      const leads = await storage.getLeads();
      res.json(leads);
    } catch (error) {
      console.error("Error fetching leads:", error);
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  });
  
  // Get a specific lead
  app.get("/api/leads/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid lead ID" });
        return;
      }
      
      const lead = await storage.getLeadById(id);
      if (!lead) {
        res.status(404).json({ error: "Lead not found" });
        return;
      }
      
      res.json(lead);
    } catch (error) {
      console.error("Error fetching lead:", error);
      res.status(500).json({ error: "Failed to fetch lead" });
    }
  });
  
  // Update lead status
  app.patch("/api/leads/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      if (isNaN(id) || !status) {
        res.status(400).json({ error: "Invalid request" });
        return;
      }
      
      const lead = await storage.updateLeadStatus(id, status);
      if (!lead) {
        res.status(404).json({ error: "Lead not found" });
        return;
      }
      
      res.json(lead);
    } catch (error) {
      console.error("Error updating lead status:", error);
      res.status(500).json({ error: "Failed to update lead status" });
    }
  });
  
  // Email Campaign Routes
  
  // Get email campaigns for a lead
  app.get("/api/leads/:leadId/campaigns", async (req, res) => {
    try {
      const leadId = parseInt(req.params.leadId);
      if (isNaN(leadId)) {
        res.status(400).json({ error: "Invalid lead ID" });
        return;
      }
      
      const campaigns = await storage.getEmailCampaignsByLead(leadId);
      res.json(campaigns);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      res.status(500).json({ error: "Failed to fetch campaigns" });
    }
  });
  
  // Create a new email campaign entry
  app.post("/api/campaigns", async (req, res) => {
    try {
      const validatedData = insertEmailCampaignSchema.parse(req.body);
      const campaign = await storage.createEmailCampaign(validatedData);
      res.json(campaign);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid campaign data", details: error.errors });
      } else {
        console.error("Error creating campaign:", error);
        res.status(500).json({ error: "Failed to create campaign" });
      }
    }
  });
  
  // Track email opened
  app.post("/api/campaigns/:id/opened", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid campaign ID" });
        return;
      }
      
      await storage.updateEmailCampaignOpened(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error updating campaign opened:", error);
      res.status(500).json({ error: "Failed to update campaign" });
    }
  });
  
  // Track email clicked
  app.post("/api/campaigns/:id/clicked", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid campaign ID" });
        return;
      }
      
      await storage.updateEmailCampaignClicked(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error updating campaign clicked:", error);
      res.status(500).json({ error: "Failed to update campaign" });
    }
  });
  
  // CA Signature Routes
  
  // Submit CA signature for investor portal access
  app.post("/api/ca-signatures", async (req, res) => {
    try {
      const validatedData = insertCASignatureSchema.parse(req.body);
      
      // Check if this email already has a signature
      const existingSignature = await storage.getCASignatureByEmail(validatedData.email);
      if (existingSignature) {
        res.status(409).json({ 
          error: "This email has already been used to sign a CA",
          signature: existingSignature 
        });
        return;
      }
      
      // Get IP address from request
      const ipAddress = req.ip || req.headers['x-forwarded-for']?.toString() || 'unknown';
      
      const signature = await storage.createCASignature({
        ...validatedData,
        ipAddress
      });
      
      res.json(signature);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid signature data", details: error.errors });
      } else {
        console.error("Error creating CA signature:", error);
        res.status(500).json({ error: "Failed to create signature" });
      }
    }
  });
  
  // Check if email has signed CA and has access
  app.get("/api/ca-signatures/check/:email", async (req, res) => {
    try {
      const email = decodeURIComponent(req.params.email || '');
      const signature = await storage.getCASignatureByEmail(email);
      
      if (!signature) {
        res.json({ hasAccess: false });
        return;
      }
      
      res.json({ 
        hasAccess: signature.hasAccess,
        signature 
      });
    } catch (error) {
      console.error("Error checking CA signature:", error);
      res.status(500).json({ error: "Failed to check signature" });
    }
  });
  
  // Get all CA signatures for dashboard
  app.get("/api/ca-signatures", async (req, res) => {
    try {
      const signatures = await storage.getCASignatures();
      res.json(signatures);
    } catch (error) {
      console.error("Error fetching signatures:", error);
      res.status(500).json({ error: "Failed to fetch signatures" });
    }
  });
  
  // Dashboard Stats Endpoint
  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      const leads = await storage.getLeads();
      const signatures = await storage.getCASignatures();
      
      // Calculate stats
      const totalLeads = leads.length;
      const newLeads = leads.filter(l => l.status === 'new').length;
      const qualifiedLeads = leads.filter(l => l.status === 'qualified').length;
      const totalSignatures = signatures.length;
      
      // Source breakdown
      const sourceBreakdown = leads.reduce((acc, lead) => {
        acc[lead.source] = (acc[lead.source] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      res.json({
        totalLeads,
        newLeads,
        qualifiedLeads,
        totalSignatures,
        sourceBreakdown,
        recentLeads: leads.slice(0, 10)
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      res.status(500).json({ error: "Failed to fetch dashboard stats" });
    }
  });

  // FAQ Chatbot Endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, conversationHistory } = req.body;
      
      if (!message) {
        res.status(400).json({ error: "Message is required" });
        return;
      }

      const propertyContext = `
You are a knowledgeable, friendly concierge for 2224 Main Street, a luxury mixed-use property in Santa Monica. Answer questions helpfully and professionally.

PROPERTY DETAILS:
- Address: 2224 Main Street, Santa Monica, CA 90405
- Listing Price: $10,395,000
- Property Type: Mixed-Use (Retail + Residential)
- Year Built: 1989
- Total Building Size: Approximately 8,000 SF
- Lot Size: 5,000 SF

RETAIL SPACE:
- Ground Floor: 2,500+ SF of prime retail space
- Currently tenanted with established businesses
- Strong retail foot traffic on Main Street

RESIDENTIAL UNITS:
- 4 luxury residential units on upper floors
- Mix of 1-bedroom and 2-bedroom configurations
- High-end finishes throughout
- Ocean and city views from select units

PARKING:
- 9 secure, single subterranean parking spaces
- Gated entry with remote access

LOCATION HIGHLIGHTS:
- Heart of Santa Monica's Main Street district
- 3 blocks from the beach
- Walking distance to Third Street Promenade
- Surrounded by upscale restaurants, boutiques, and galleries
- Excellent walkability and bike score
- Near Metro Expo Line for downtown LA access

INVESTMENT HIGHLIGHTS:
- Trophy asset in one of LA's most desirable submarkets
- Strong tenant mix providing stable income
- Excellent cap rate potential
- Value-add opportunities available
- Prime location with limited comparable inventory

BROKER CONTACTS:
- Pat Ayau: payau@leewestla.com
- Travis Majick: majickcre@gmail.com
- For private tours and offering memorandum access, visit the Broker/Investor Portal

IMPORTANT GUIDELINES:
- Be helpful, professional, and concise
- If you don't know specific details, recommend contacting the brokers
- For sensitive financial details, direct users to sign the Confidentiality Agreement in the Broker Portal
- Encourage scheduling private tours for serious inquiries
- Do not make up information not provided above
`;

      const messages: { role: "system" | "user" | "assistant"; content: string }[] = [
        { role: "system", content: propertyContext }
      ];

      if (conversationHistory && Array.isArray(conversationHistory)) {
        for (const msg of conversationHistory.slice(-10)) {
          messages.push({
            role: msg.role === 'user' ? 'user' : 'assistant',
            content: msg.text
          });
        }
      }

      messages.push({ role: "user", content: message });

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages,
        max_tokens: 500,
        temperature: 0.7,
      });

      const response = completion.choices[0]?.message?.content || "I apologize, but I'm having trouble responding. Please contact our team directly at payau@leewestla.com.";

      res.json({ response });
    } catch (error) {
      console.error("Error in chat:", error);
      res.status(500).json({ error: "Failed to process message. Please try again." });
    }
  });

  // AI Social Content Generator Endpoint
  app.post("/api/generate-social-content", requireAuth, async (req, res) => {
    try {
      const { platform, contentType, customPrompt } = req.body;
      
      if (!platform) {
        res.status(400).json({ error: "Platform is required" });
        return;
      }

      const propertyInfo = `
        Property: 2224 Main Street, Santa Monica, CA
        Price: $10,395,000
        Type: Mixed-Use (Retail + Residential)
        Features:
        - Prime Main Street location in Santa Monica
        - 5,500+ SF of retail space
        - 4 luxury residential units above
        - Strong tenant mix with established businesses
        - Walking distance to beach, Third Street Promenade
        - Excellent cap rate and cash flow potential
        - Trophy asset in one of LA's most desirable markets
      `;

      const platformGuidelines: Record<string, string> = {
        linkedin: `
          Write for LinkedIn professionals and investors.
          - Keep it professional but engaging
          - 150-250 words ideal
          - Include 3-5 relevant hashtags
          - Focus on investment opportunity, market analysis, ROI potential
          - Use line breaks for readability
          - End with a call-to-action
        `,
        instagram: `
          Write for Instagram real estate enthusiasts.
          - Catchy opening hook
          - 100-150 words
          - Use emojis sparingly but effectively
          - Include 15-20 relevant hashtags at the end
          - Focus on lifestyle, location appeal, visual elements
          - Create FOMO and excitement
        `,
        facebook: `
          Write for Facebook general audience.
          - Conversational and approachable tone
          - 100-200 words
          - Can include emojis
          - Focus on community, lifestyle, investment opportunity
          - Encourage engagement and sharing
          - Include 3-5 hashtags
        `
      };

      const contentTypes: Record<string, string> = {
        announcement: "Create an exciting property listing announcement post.",
        investment: "Focus on the investment opportunity and financial benefits.",
        lifestyle: "Highlight the lifestyle and location benefits of this property.",
        marketUpdate: "Position this as a market update about Santa Monica real estate.",
        priceReduction: "Create urgency around a limited-time opportunity.",
        openHouse: "Promote an exclusive viewing opportunity for qualified buyers.",
      };

      const prompt = `You are an expert real estate social media marketer. Generate a compelling ${platform.toUpperCase()} post for this luxury property.

${propertyInfo}

${platformGuidelines[platform] || platformGuidelines.linkedin}

Content Type: ${contentTypes[contentType] || contentTypes.announcement}

${customPrompt ? `Additional instructions: ${customPrompt}` : ''}

Generate only the post content, ready to copy and paste. Do not include any explanations or meta-commentary.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a luxury real estate marketing expert specializing in social media content that drives engagement and leads." },
          { role: "user", content: prompt }
        ],
        max_tokens: 1000,
        temperature: 0.8,
      });

      const content = completion.choices[0]?.message?.content || "Failed to generate content";

      res.json({ 
        content,
        platform,
        contentType: contentType || "announcement"
      });
    } catch (error) {
      console.error("Error generating social content:", error);
      res.status(500).json({ error: "Failed to generate content. Please try again." });
    }
  });

  // Share Links Routes
  
  // Create a share link (broker only)
  app.post("/api/share-links", requireAuth, async (req, res) => {
    try {
      const { recipientEmail, recipientName, message, documentTypes, expiresInDays } = req.body;
      
      if (!recipientEmail) {
        res.status(400).json({ error: "Recipient email is required" });
        return;
      }
      
      // Calculate expiration date (default 7 days)
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + (expiresInDays || 7));
      
      const shareLink = await storage.createShareLink({
        recipientEmail,
        recipientName: recipientName || null,
        message: message || null,
        documentTypes: documentTypes || "all",
        expiresAt,
        brokerId: req.session.userId
      });
      
      // Generate the share URL
      const baseUrl = process.env.NODE_ENV === 'production' 
        ? 'https://2224main.com'
        : `http://localhost:5000`;
      const shareUrl = `${baseUrl}/shared-access/${shareLink.token}`;
      
      // Send email notification to recipient
      try {
        await emailService.sendShareLinkEmail({
          to: recipientEmail,
          recipientName: recipientName || 'Valued Client',
          shareUrl,
          message: message || null,
          senderName: req.session.userName || 'Your Broker'
        });
      } catch (emailError) {
        console.error("Error sending share link email:", emailError);
        // Don't fail the share link creation if email fails
      }
      
      res.json({ 
        ...shareLink,
        shareUrl 
      });
    } catch (error) {
      console.error("Error creating share link:", error);
      res.status(500).json({ error: "Failed to create share link" });
    }
  });
  
  // Get share links created by current broker
  app.get("/api/share-links", requireAuth, async (req, res) => {
    try {
      const shareLinks = await storage.getShareLinksByBroker(req.session.userId!);
      res.json(shareLinks);
    } catch (error) {
      console.error("Error fetching share links:", error);
      res.status(500).json({ error: "Failed to fetch share links" });
    }
  });
  
  // Validate share link token (public - client uses this)
  app.get("/api/share-links/:token", async (req, res) => {
    try {
      const { token } = req.params;
      const shareLink = await storage.getShareLinkByToken(token);
      
      if (!shareLink) {
        res.status(404).json({ error: "Share link not found or expired" });
        return;
      }
      
      // Check if expired
      if (shareLink.expiresAt && new Date() > new Date(shareLink.expiresAt)) {
        res.status(410).json({ error: "This share link has expired" });
        return;
      }
      
      // Return limited info for validation
      res.json({
        valid: true,
        recipientName: shareLink.recipientName,
        message: shareLink.message,
        hasSubmitted: shareLink.status === "accessed"
      });
    } catch (error) {
      console.error("Error validating share link:", error);
      res.status(500).json({ error: "Failed to validate share link" });
    }
  });
  
  // Submit client details to access shared documents
  app.post("/api/share-links/:token/submit", async (req, res) => {
    try {
      const { token } = req.params;
      const shareLink = await storage.getShareLinkByToken(token);
      
      if (!shareLink) {
        res.status(404).json({ error: "Share link not found" });
        return;
      }
      
      // Check if expired
      if (shareLink.expiresAt && new Date() > new Date(shareLink.expiresAt)) {
        res.status(410).json({ error: "This share link has expired" });
        return;
      }
      
      // Validate submission data
      const validatedData = insertShareLinkSubmissionSchema.parse(req.body);
      
      // Create or find a lead for this client
      let leadId: number | undefined;
      try {
        const lead = await storage.createLead({
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone || null,
          company: validatedData.company || null,
          message: validatedData.interest || "Accessed shared documents",
          source: "shared-link",
          status: "new"
        });
        leadId = lead.id;
        
        // Send welcome email/SMS
        try {
          await emailService.sendWelcomeEmail(lead);
          await smsService.sendWelcomeSMS(lead);
        } catch (emailErr) {
          console.error("Error sending welcome communications:", emailErr);
        }
      } catch (leadError) {
        console.error("Error creating lead from share link submission:", leadError);
        // Continue without lead if it fails (maybe duplicate email)
      }
      
      // Create submission record
      const submission = await storage.createShareLinkSubmission(
        shareLink.id,
        validatedData,
        leadId
      );
      
      // Mark share link as accessed
      await storage.updateShareLinkAccessed(shareLink.id);
      
      // Generate access token (simple approach - using the same token)
      res.json({
        success: true,
        accessGranted: true,
        submission
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid submission data", details: error.errors });
      } else {
        console.error("Error submitting to share link:", error);
        res.status(500).json({ error: "Failed to submit" });
      }
    }
  });
  
  // Check if client has already submitted for a share link
  app.get("/api/share-links/:token/check-access/:email", async (req, res) => {
    try {
      const { token, email } = req.params;
      const shareLink = await storage.getShareLinkByToken(token);
      
      if (!shareLink) {
        res.status(404).json({ error: "Share link not found" });
        return;
      }
      
      const submissions = await storage.getSubmissionsByShareLink(shareLink.id);
      const hasAccess = submissions.some(s => s.email.toLowerCase() === email.toLowerCase());
      
      res.json({ hasAccess });
    } catch (error) {
      console.error("Error checking access:", error);
      res.status(500).json({ error: "Failed to check access" });
    }
  });

  // Pitch Links Routes
  
  // Create a pitch link (admin only)
  app.post("/api/pitch-links", requireAuth, async (req, res) => {
    try {
      const { name, email, purpose, expiresInDays } = req.body;
      
      if (!name) {
        res.status(400).json({ error: "Name is required" });
        return;
      }
      
      const expiresAt = expiresInDays 
        ? new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000)
        : null;
      
      const pitchLink = await storage.createPitchLink({
        name,
        email: email || null,
        purpose: purpose || null,
        expiresAt,
      });
      
      const baseUrl = process.env.NODE_ENV === 'production' 
        ? 'https://2224main.com'
        : `http://localhost:5000`;
      const pitchUrl = `${baseUrl}/pitch/${pitchLink.token}`;
      
      res.json({ 
        ...pitchLink,
        pitchUrl 
      });
    } catch (error) {
      console.error("Error creating pitch link:", error);
      res.status(500).json({ error: "Failed to create pitch link" });
    }
  });
  
  // Get all pitch links (admin only)
  app.get("/api/pitch-links", requireAuth, async (req, res) => {
    try {
      const pitchLinks = await storage.getAllPitchLinks();
      res.json(pitchLinks);
    } catch (error) {
      console.error("Error fetching pitch links:", error);
      res.status(500).json({ error: "Failed to fetch pitch links" });
    }
  });
  
  // Validate pitch link token (public)
  app.get("/api/pitch/:token", async (req, res) => {
    try {
      const { token } = req.params;
      const pitchLink = await storage.getPitchLinkByToken(token);
      
      if (!pitchLink) {
        res.status(404).json({ error: "Pitch link not found" });
        return;
      }
      
      if (!pitchLink.isActive) {
        res.status(410).json({ error: "This pitch link is no longer active" });
        return;
      }
      
      if (pitchLink.expiresAt && new Date() > new Date(pitchLink.expiresAt)) {
        res.status(410).json({ error: "This pitch link has expired" });
        return;
      }
      
      // Update view count
      await storage.updatePitchLinkViewed(pitchLink.id);
      
      res.json({
        valid: true,
        name: pitchLink.name
      });
    } catch (error) {
      console.error("Error validating pitch link:", error);
      res.status(500).json({ error: "Failed to validate pitch link" });
    }
  });

  return httpServer;
}
