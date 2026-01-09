import { db } from "./db";
import { pitchLinks } from "@shared/schema";
import crypto from "crypto";

async function createPitchLink() {
  const token = crypto.randomBytes(16).toString('hex');
  
  const [pitchLink] = await db
    .insert(pitchLinks)
    .values({
      token,
      name: "Investor Presentation",
      email: null,
      purpose: "Funding pitch for AI real estate platform",
      isActive: true,
      expiresAt: null,
    })
    .returning();
  
  console.log("\n=== Private Pitch Link Created ===\n");
  console.log(`Token: ${pitchLink.token}`);
  console.log(`\nLocal URL: http://localhost:5000/pitch/${pitchLink.token}`);
  console.log(`Production URL: https://2224main.com/pitch/${pitchLink.token}`);
  console.log("\nShare this link with potential investors.\n");
  
  process.exit(0);
}

createPitchLink().catch(console.error);
