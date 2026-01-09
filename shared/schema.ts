import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Admin Users Table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull().default("admin"),
});

export const insertUserSchema = createInsertSchema(users, {
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
}).omit({ id: true, role: true });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// Leads Table
export const leads = pgTable("leads", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  message: text("message"),
  source: text("source").notNull().default("website"),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertLeadSchema = createInsertSchema(leads, {
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().optional(),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;

// Email Campaign Tracking
export const emailCampaigns = pgTable("email_campaigns", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  leadId: integer("lead_id").notNull().references(() => leads.id),
  step: integer("step").notNull(),
  emailType: text("email_type").notNull(),
  sentAt: timestamp("sent_at").notNull().defaultNow(),
  openedAt: timestamp("opened_at"),
  clickedAt: timestamp("clicked_at"),
  status: text("status").notNull().default("sent"),
});

export const insertEmailCampaignSchema = createInsertSchema(emailCampaigns, {
  leadId: z.number(),
  step: z.number(),
  emailType: z.string(),
}).omit({
  id: true,
  sentAt: true,
  openedAt: true,
  clickedAt: true,
});

export type InsertEmailCampaign = z.infer<typeof insertEmailCampaignSchema>;
export type EmailCampaign = typeof emailCampaigns.$inferSelect;

// CA Signatures (Confidentiality Agreement)
export const caSignatures = pgTable("ca_signatures", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  signature: text("signature").notNull(),
  ipAddress: text("ip_address"),
  signedAt: timestamp("signed_at").notNull().defaultNow(),
  hasAccess: boolean("has_access").notNull().default(true),
});

export const insertCASignatureSchema = createInsertSchema(caSignatures, {
  name: z.string().min(2),
  email: z.string().email(),
  signature: z.string().min(2),
  ipAddress: z.string().optional(),
}).omit({
  id: true,
  signedAt: true,
  hasAccess: true,
});

export type InsertCASignature = z.infer<typeof insertCASignatureSchema>;
export type CASignature = typeof caSignatures.$inferSelect;

// Share Links for Document Sharing
export const shareLinks = pgTable("share_links", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  token: text("token").notNull().unique(),
  brokerId: varchar("broker_id").references(() => users.id),
  recipientEmail: text("recipient_email").notNull(),
  recipientName: text("recipient_name"),
  message: text("message"),
  documentTypes: text("document_types").notNull().default("all"),
  status: text("status").notNull().default("pending"),
  accessedAt: timestamp("accessed_at"),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertShareLinkSchema = createInsertSchema(shareLinks, {
  recipientEmail: z.string().email(),
  recipientName: z.string().optional(),
  message: z.string().optional(),
  documentTypes: z.string().optional(),
}).omit({
  id: true,
  token: true,
  status: true,
  accessedAt: true,
  createdAt: true,
});

export type InsertShareLink = z.infer<typeof insertShareLinkSchema>;
export type ShareLink = typeof shareLinks.$inferSelect;

// Share Link Submissions (captures client details when they access shared docs)
export const shareLinkSubmissions = pgTable("share_link_submissions", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  shareLinkId: integer("share_link_id").notNull().references(() => shareLinks.id),
  leadId: integer("lead_id").references(() => leads.id),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  interest: text("interest"),
  company: text("company"),
  submittedAt: timestamp("submitted_at").notNull().defaultNow(),
});

export const insertShareLinkSubmissionSchema = createInsertSchema(shareLinkSubmissions, {
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  interest: z.string().optional(),
  company: z.string().optional(),
}).omit({
  id: true,
  shareLinkId: true,
  leadId: true,
  submittedAt: true,
});

export type InsertShareLinkSubmission = z.infer<typeof insertShareLinkSubmissionSchema>;
export type ShareLinkSubmission = typeof shareLinkSubmissions.$inferSelect;

// Pitch Links for Private Investor Presentations
export const pitchLinks = pgTable("pitch_links", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  token: text("token").notNull().unique(),
  name: text("name").notNull(),
  email: text("email"),
  purpose: text("purpose"),
  isActive: boolean("is_active").notNull().default(true),
  expiresAt: timestamp("expires_at"),
  viewCount: integer("view_count").notNull().default(0),
  lastViewedAt: timestamp("last_viewed_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertPitchLinkSchema = createInsertSchema(pitchLinks, {
  name: z.string().min(2),
  email: z.string().email().optional(),
  purpose: z.string().optional(),
}).omit({
  id: true,
  token: true,
  isActive: true,
  viewCount: true,
  lastViewedAt: true,
  createdAt: true,
});

export type InsertPitchLink = z.infer<typeof insertPitchLinkSchema>;
export type PitchLink = typeof pitchLinks.$inferSelect;
