import bcrypt from "bcryptjs";
import { db } from "./db";
import { users } from "@shared/schema";
import { eq } from "drizzle-orm";

const ADMIN_USERS = [
  {
    email: "payau@leewestla.com",
    name: "Pat Ayau",
    password: "Admin2224!"
  },
  {
    email: "majickcre@gmail.com",
    name: "Travis Majick",
    password: "Admin2224!"
  }
];

async function seedAdmins() {
  console.log("Seeding admin users...");
  
  for (const admin of ADMIN_USERS) {
    const existing = await db.select().from(users).where(eq(users.email, admin.email));
    const hashedPassword = await bcrypt.hash(admin.password, 10);
    
    if (existing.length > 0) {
      await db.update(users)
        .set({ password: hashedPassword })
        .where(eq(users.email, admin.email));
      console.log(`Updated password for admin: ${admin.email}`);
      continue;
    }
    
    await db.insert(users).values({
      email: admin.email,
      name: admin.name,
      password: hashedPassword,
      role: "admin"
    });
    
    console.log(`Created admin: ${admin.name} (${admin.email})`);
  }
  
  console.log("Admin seeding complete!");
  process.exit(0);
}

seedAdmins().catch((err) => {
  console.error("Error seeding admins:", err);
  process.exit(1);
});
