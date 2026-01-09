import type { Lead } from "@shared/schema";

export interface EmailTemplate {
  subject: string;
  html: string;
}

const NURTURE_CAMPAIGNS: Record<string, EmailTemplate[]> = {
  default: [
    {
      subject: "Thank you for your interest in 2224 Main Street",
      html: `
        <div style="font-family: Montserrat, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="font-family: 'Cormorant Garamond', serif; color: #1a1a1a;">Welcome</h1>
          <p>Thank you for your interest in this exceptional mixed-use opportunity in Santa Monica.</p>
          <p>This 17,760 SF property at 2224 Main Street represents a rare chance to acquire a premier mixed-use asset in one of Los Angeles's most dynamic neighborhoods.</p>
          <p style="margin-top: 30px;">
            <a href="https://2224-main.replit.app/virtual-tour" style="background: #1a1a1a; color: white; padding: 12px 24px; text-decoration: none; display: inline-block;">View Virtual Tour</a>
          </p>
          <p style="margin-top: 30px; color: #666; font-size: 14px;">Best regards,<br>The Investment Team</p>
        </div>
      `
    },
    {
      subject: "Investment Highlights - 2224 Main Street",
      html: `
        <div style="font-family: Montserrat, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="font-family: 'Cormorant Garamond', serif; color: #1a1a1a;">Key Investment Highlights</h1>
          <ul style="line-height: 1.8;">
            <li>17,760 SF mixed-use building with prime retail and residential spaces</li>
            <li>Located in the heart of Santa Monica's Main Street corridor</li>
            <li>Strong demographics with median household income of $121,000+</li>
            <li>Tremendous future growth potential in a thriving coastal market</li>
          </ul>
          <p style="margin-top: 30px;">
            <a href="https://2224-main.replit.app/investor-portal" style="background: #1a1a1a; color: white; padding: 12px 24px; text-decoration: none; display: inline-block;">Access Due Diligence Documents</a>
          </p>
          <p style="margin-top: 30px; color: #666; font-size: 14px;">Ready to learn more? Contact us to discuss this opportunity.</p>
        </div>
      `
    },
    {
      subject: "Final Reminder: 2224 Main Street Opportunity",
      html: `
        <div style="font-family: Montserrat, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="font-family: 'Cormorant Garamond', serif; color: #1a1a1a;">Don't Miss This Opportunity</h1>
          <p>This is a final reminder about the exceptional mixed-use property at 2224 Main Street in Santa Monica.</p>
          <p><strong>Asking Price:</strong> $10,395,000</p>
          <p>Properties of this caliber in Santa Monica rarely become available. We encourage you to schedule a viewing or review the complete offering materials at your earliest convenience.</p>
          <p style="margin-top: 30px;">
            <a href="https://2224-main.replit.app/contact" style="background: #1a1a1a; color: white; padding: 12px 24px; text-decoration: none; display: inline-block;">Schedule a Viewing</a>
          </p>
          <p style="margin-top: 30px; color: #666; font-size: 14px;">Questions? Reply to this email or contact us directly.</p>
        </div>
      `
    }
  ]
};

export class EmailService {
  private useRealEmails: boolean = false;
  
  async sendNurtureEmail(lead: Lead, step: number): Promise<boolean> {
    const templates = NURTURE_CAMPAIGNS.default;
    
    if (step < 0 || step >= templates.length) {
      console.error(`Invalid nurture step ${step}. Must be between 0 and ${templates.length - 1}`);
      return false;
    }
    
    const template = templates[step];
    
    if (this.useRealEmails) {
      // TODO: Integrate with SendGrid or Resend when user sets up integration
      console.log(`[EMAIL SERVICE] Would send email to ${lead.email}:`);
      console.log(`  Subject: ${template.subject}`);
      console.log(`  Step: ${step + 1}/${templates.length}`);
      return true;
    } else {
      // Log mode for development
      console.log(`[EMAIL SERVICE - DEV MODE] Nurture email logged:`);
      console.log(`  To: ${lead.email} (${lead.name})`);
      console.log(`  Subject: ${template.subject}`);
      console.log(`  Step: ${step + 1}/${templates.length}`);
      console.log(`  Source: ${lead.source}`);
      return true;
    }
  }
  
  async sendWelcomeEmail(lead: Lead): Promise<boolean> {
    return this.sendNurtureEmail(lead, 0);
  }
  
  async sendShareLinkEmail(params: {
    to: string;
    recipientName: string;
    shareUrl: string;
    message: string | null;
    senderName: string;
  }): Promise<boolean> {
    const { to, recipientName, shareUrl, message, senderName } = params;
    
    const template = {
      subject: `${senderName} has shared exclusive property documents with you - 2224 Main Street`,
      html: `
        <div style="font-family: Montserrat, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="font-family: 'Cormorant Garamond', serif; color: #1a1a1a; font-size: 28px;">2224 Main Street</h1>
            <p style="color: #666; font-size: 14px;">Exclusive Investment Opportunity</p>
          </div>
          
          <p style="font-size: 16px;">Dear ${recipientName},</p>
          
          <p style="font-size: 16px; line-height: 1.6;">
            ${senderName} has shared exclusive due diligence documents with you for 
            <strong>2224 Main Street, Santa Monica</strong> - a premier mixed-use property listed at $10,395,000.
          </p>
          
          ${message ? `<div style="background: #f5f5f5; padding: 15px; margin: 20px 0; border-left: 4px solid #1a1a1a; font-style: italic;">"${message}"</div>` : ''}
          
          <p style="font-size: 16px; line-height: 1.6;">
            To access the confidential documents, please click the button below and provide your contact information. 
            This helps us serve you better and keep you updated on this opportunity.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${shareUrl}" style="background: #1a1a1a; color: white; padding: 14px 28px; text-decoration: none; display: inline-block; font-weight: 600; border-radius: 4px;">Access Documents</a>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 14px;">
              Best regards,<br>
              <strong>${senderName}</strong><br>
              Lee & Associates
            </p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
            <p style="color: #999; font-size: 12px;">
              This link will expire in 7 days. If you have any questions, please contact your broker directly.
            </p>
          </div>
        </div>
      `
    };
    
    if (this.useRealEmails) {
      // TODO: Integrate with SendGrid or Resend when user sets up integration
      console.log(`[EMAIL SERVICE] Would send share link email to ${to}:`);
      console.log(`  Subject: ${template.subject}`);
      console.log(`  Share URL: ${shareUrl}`);
      return true;
    } else {
      console.log(`[EMAIL SERVICE - DEV MODE] Share link email logged:`);
      console.log(`  To: ${to} (${recipientName})`);
      console.log(`  Subject: ${template.subject}`);
      console.log(`  Share URL: ${shareUrl}`);
      console.log(`  From: ${senderName}`);
      return true;
    }
  }
  
  getNurtureStepCount(): number {
    return NURTURE_CAMPAIGNS.default.length;
  }
  
  enableRealEmails(enabled: boolean): void {
    this.useRealEmails = enabled;
    console.log(`[EMAIL SERVICE] Real email sending: ${enabled ? 'ENABLED' : 'DISABLED'}`);
  }
}

export const emailService = new EmailService();
