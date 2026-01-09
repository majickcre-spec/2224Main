import type { Lead } from "@shared/schema";

interface SMSTemplate {
  body: string;
}

const SMS_TEMPLATES: SMSTemplate[] = [
  {
    body: "Thank you for your interest in 2224 Main Street, Santa Monica. Our team will reach out shortly. View property details: 2224main.com"
  },
  {
    body: "Hi {{name}}, just following up on your inquiry about 2224 Main Street. Would you like to schedule a private viewing? Reply YES or call us."
  },
  {
    body: "Final reminder: The mixed-use property at 2224 Main Street ($10.395M) is attracting serious interest. Schedule your viewing today: 2224main.com"
  }
];

class SMSService {
  private useRealSMS: boolean;
  private twilioAccountSid: string | undefined;
  private twilioAuthToken: string | undefined;
  private twilioPhoneNumber: string | undefined;

  constructor() {
    this.twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
    this.twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
    this.twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
    this.useRealSMS = !!(this.twilioAccountSid && this.twilioAuthToken && this.twilioPhoneNumber);
    
    if (this.useRealSMS) {
      console.log("[SMS SERVICE] Twilio configured - real SMS enabled");
    } else {
      console.log("[SMS SERVICE] Running in dev mode - SMS will be logged only");
    }
  }

  private formatMessage(template: string, lead: Lead): string {
    return template
      .replace(/{{name}}/g, lead.name.split(' ')[0])
      .replace(/{{email}}/g, lead.email);
  }

  async sendSMS(lead: Lead, step: number): Promise<boolean> {
    if (!lead.phone) {
      console.log(`[SMS SERVICE] No phone number for lead ${lead.email}, skipping SMS`);
      return false;
    }

    if (step < 0 || step >= SMS_TEMPLATES.length) {
      console.error(`Invalid SMS step ${step}. Must be between 0 and ${SMS_TEMPLATES.length - 1}`);
      return false;
    }

    const template = SMS_TEMPLATES[step];
    const message = this.formatMessage(template.body, lead);

    if (this.useRealSMS) {
      try {
        const response = await fetch(
          `https://api.twilio.com/2010-04-01/Accounts/${this.twilioAccountSid}/Messages.json`,
          {
            method: 'POST',
            headers: {
              'Authorization': 'Basic ' + Buffer.from(`${this.twilioAccountSid}:${this.twilioAuthToken}`).toString('base64'),
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              To: lead.phone,
              From: this.twilioPhoneNumber!,
              Body: message,
            }),
          }
        );

        if (response.ok) {
          console.log(`[SMS SERVICE] Sent SMS to ${lead.phone}: "${message.substring(0, 50)}..."`);
          return true;
        } else {
          const error = await response.json();
          console.error(`[SMS SERVICE] Failed to send SMS:`, error);
          return false;
        }
      } catch (error) {
        console.error(`[SMS SERVICE] Error sending SMS:`, error);
        return false;
      }
    } else {
      console.log(`[SMS SERVICE - DEV MODE] SMS logged:`);
      console.log(`  To: ${lead.phone} (${lead.name})`);
      console.log(`  Message: ${message}`);
      console.log(`  Step: ${step + 1}/${SMS_TEMPLATES.length}`);
      return true;
    }
  }

  async sendWelcomeSMS(lead: Lead): Promise<boolean> {
    return this.sendSMS(lead, 0);
  }

  async sendFollowUpSMS(lead: Lead): Promise<boolean> {
    return this.sendSMS(lead, 1);
  }

  async sendFinalReminderSMS(lead: Lead): Promise<boolean> {
    return this.sendSMS(lead, 2);
  }
}

export const smsService = new SMSService();
