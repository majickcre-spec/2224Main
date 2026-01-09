import { 
  users, 
  leads,
  emailCampaigns,
  caSignatures,
  shareLinks,
  shareLinkSubmissions,
  pitchLinks,
  type User, 
  type InsertUser,
  type Lead,
  type InsertLead,
  type EmailCampaign,
  type InsertEmailCampaign,
  type CASignature,
  type InsertCASignature,
  type ShareLink,
  type InsertShareLink,
  type ShareLinkSubmission,
  type InsertShareLinkSubmission,
  type PitchLink,
  type InsertPitchLink
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import crypto from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  
  // Leads
  getLeads(): Promise<Lead[]>;
  getLeadById(id: number): Promise<Lead | undefined>;
  createLead(lead: InsertLead): Promise<Lead>;
  updateLeadStatus(id: number, status: string): Promise<Lead | undefined>;
  
  // Email Campaigns
  getEmailCampaignsByLead(leadId: number): Promise<EmailCampaign[]>;
  createEmailCampaign(campaign: InsertEmailCampaign): Promise<EmailCampaign>;
  updateEmailCampaignOpened(id: number): Promise<void>;
  updateEmailCampaignClicked(id: number): Promise<void>;
  
  // CA Signatures
  getCASignatures(): Promise<CASignature[]>;
  getCASignatureByEmail(email: string): Promise<CASignature | undefined>;
  createCASignature(signature: InsertCASignature): Promise<CASignature>;
  
  // Share Links
  createShareLink(data: InsertShareLink & { brokerId?: string }): Promise<ShareLink>;
  getShareLinkByToken(token: string): Promise<ShareLink | undefined>;
  getShareLinksByBroker(brokerId: string): Promise<ShareLink[]>;
  updateShareLinkAccessed(id: number): Promise<ShareLink | undefined>;
  
  // Share Link Submissions
  createShareLinkSubmission(shareLinkId: number, data: InsertShareLinkSubmission, leadId?: number): Promise<ShareLinkSubmission>;
  getSubmissionsByShareLink(shareLinkId: number): Promise<ShareLinkSubmission[]>;
  
  // Pitch Links
  createPitchLink(data: InsertPitchLink): Promise<PitchLink>;
  getPitchLinkByToken(token: string): Promise<PitchLink | undefined>;
  updatePitchLinkViewed(id: number): Promise<void>;
  getAllPitchLinks(): Promise<PitchLink[]>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }
  
  // Leads
  async getLeads(): Promise<Lead[]> {
    return await db.select().from(leads).orderBy(desc(leads.createdAt));
  }
  
  async getLeadById(id: number): Promise<Lead | undefined> {
    const [lead] = await db.select().from(leads).where(eq(leads.id, id));
    return lead || undefined;
  }
  
  async createLead(insertLead: InsertLead): Promise<Lead> {
    const [lead] = await db
      .insert(leads)
      .values(insertLead)
      .returning();
    return lead;
  }
  
  async updateLeadStatus(id: number, status: string): Promise<Lead | undefined> {
    const [lead] = await db
      .update(leads)
      .set({ status, updatedAt: new Date() })
      .where(eq(leads.id, id))
      .returning();
    return lead || undefined;
  }
  
  // Email Campaigns
  async getEmailCampaignsByLead(leadId: number): Promise<EmailCampaign[]> {
    return await db
      .select()
      .from(emailCampaigns)
      .where(eq(emailCampaigns.leadId, leadId))
      .orderBy(emailCampaigns.step);
  }
  
  async createEmailCampaign(insertCampaign: InsertEmailCampaign): Promise<EmailCampaign> {
    const [campaign] = await db
      .insert(emailCampaigns)
      .values(insertCampaign)
      .returning();
    return campaign;
  }
  
  async updateEmailCampaignOpened(id: number): Promise<void> {
    await db
      .update(emailCampaigns)
      .set({ 
        openedAt: new Date(),
        status: "opened"
      })
      .where(eq(emailCampaigns.id, id));
  }
  
  async updateEmailCampaignClicked(id: number): Promise<void> {
    await db
      .update(emailCampaigns)
      .set({ 
        clickedAt: new Date(),
        status: "clicked"
      })
      .where(eq(emailCampaigns.id, id));
  }
  
  // CA Signatures
  async getCASignatures(): Promise<CASignature[]> {
    return await db.select().from(caSignatures).orderBy(desc(caSignatures.signedAt));
  }
  
  async getCASignatureByEmail(email: string): Promise<CASignature | undefined> {
    const [signature] = await db
      .select()
      .from(caSignatures)
      .where(eq(caSignatures.email, email));
    return signature || undefined;
  }
  
  async createCASignature(insertSignature: InsertCASignature): Promise<CASignature> {
    const [signature] = await db
      .insert(caSignatures)
      .values(insertSignature)
      .returning();
    return signature;
  }
  
  // Share Links
  async createShareLink(data: InsertShareLink & { brokerId?: string }): Promise<ShareLink> {
    const token = crypto.randomBytes(32).toString('hex');
    const [shareLink] = await db
      .insert(shareLinks)
      .values({
        ...data,
        token,
        brokerId: data.brokerId || null,
      })
      .returning();
    return shareLink;
  }
  
  async getShareLinkByToken(token: string): Promise<ShareLink | undefined> {
    const [shareLink] = await db
      .select()
      .from(shareLinks)
      .where(eq(shareLinks.token, token));
    return shareLink || undefined;
  }
  
  async getShareLinksByBroker(brokerId: string): Promise<ShareLink[]> {
    return await db
      .select()
      .from(shareLinks)
      .where(eq(shareLinks.brokerId, brokerId))
      .orderBy(desc(shareLinks.createdAt));
  }
  
  async updateShareLinkAccessed(id: number): Promise<ShareLink | undefined> {
    const [shareLink] = await db
      .update(shareLinks)
      .set({ 
        accessedAt: new Date(),
        status: "accessed"
      })
      .where(eq(shareLinks.id, id))
      .returning();
    return shareLink || undefined;
  }
  
  // Share Link Submissions
  async createShareLinkSubmission(
    shareLinkId: number, 
    data: InsertShareLinkSubmission, 
    leadId?: number
  ): Promise<ShareLinkSubmission> {
    const [submission] = await db
      .insert(shareLinkSubmissions)
      .values({
        ...data,
        shareLinkId,
        leadId: leadId || null,
      })
      .returning();
    return submission;
  }
  
  async getSubmissionsByShareLink(shareLinkId: number): Promise<ShareLinkSubmission[]> {
    return await db
      .select()
      .from(shareLinkSubmissions)
      .where(eq(shareLinkSubmissions.shareLinkId, shareLinkId))
      .orderBy(desc(shareLinkSubmissions.submittedAt));
  }
  
  // Pitch Links
  async createPitchLink(data: InsertPitchLink): Promise<PitchLink> {
    const token = crypto.randomBytes(16).toString('hex');
    const [pitchLink] = await db
      .insert(pitchLinks)
      .values({
        ...data,
        token,
      })
      .returning();
    return pitchLink;
  }
  
  async getPitchLinkByToken(token: string): Promise<PitchLink | undefined> {
    const [pitchLink] = await db
      .select()
      .from(pitchLinks)
      .where(eq(pitchLinks.token, token));
    return pitchLink || undefined;
  }
  
  async updatePitchLinkViewed(id: number): Promise<void> {
    const [current] = await db.select().from(pitchLinks).where(eq(pitchLinks.id, id));
    if (current) {
      await db
        .update(pitchLinks)
        .set({ 
          viewCount: current.viewCount + 1,
          lastViewedAt: new Date()
        })
        .where(eq(pitchLinks.id, id));
    }
  }
  
  async getAllPitchLinks(): Promise<PitchLink[]> {
    return await db
      .select()
      .from(pitchLinks)
      .orderBy(desc(pitchLinks.createdAt));
  }
}

export const storage = new DatabaseStorage();
