import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import session from "express-session";
import MemoryStore from "memorystore";
import bcrypt from "bcryptjs";
import { db } from "./db";
import { users, pitchLinks } from "@shared/schema";
import { eq } from "drizzle-orm";

const app = express();
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

declare module "express-session" {
  interface SessionData {
    userId?: string;
    userEmail?: string;
    userName?: string;
  }
}

const MemoryStoreSession = MemoryStore(session);

app.use(session({
  secret: process.env.SESSION_SECRET || 'real-estate-admin-secret-key-2024',
  resave: false,
  saveUninitialized: false,
  store: new MemoryStoreSession({
    checkPeriod: 86400000 // 24 hours
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

async function seedAdminUsers() {
  const adminUsers = [
    { email: "payau@leewestla.com", name: "Pat Ayau", password: "Admin2224!" },
    { email: "majickcre@gmail.com", name: "Travis Majick", password: "Admin2224!" }
  ];

  for (const admin of adminUsers) {
    try {
      const existing = await db.select().from(users).where(eq(users.email, admin.email));
      const hashedPassword = await bcrypt.hash(admin.password, 10);

      if (existing.length > 0) {
        await db.update(users)
          .set({ password: hashedPassword })
          .where(eq(users.email, admin.email));
      } else {
        await db.insert(users).values({
          email: admin.email,
          name: admin.name,
          password: hashedPassword,
          role: "admin"
        });
      }
    } catch (err) {
      console.error(`Failed to seed admin ${admin.email}:`, err);
    }
  }
  log("Admin users initialized");
}

async function seedPitchLink() {
  const token = "8d5460f59ec051a9fea3df2f9fa95ae7";
  try {
    const existing = await db.select().from(pitchLinks).where(eq(pitchLinks.token, token));
    if (existing.length === 0) {
      await db.insert(pitchLinks).values({
        token,
        name: "Investor Presentation",
        purpose: "Funding pitch for AI real estate platform",
        isActive: true
      });
      log("Pitch link initialized");
    }
  } catch (err) {
    console.error("Failed to seed pitch link:", err);
  }
}

(async () => {
  await seedAdminUsers();
  await seedPitchLink();
  await registerRoutes(httpServer, app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen(
    {
      port,
      host: "0.0.0.0",
      reusePort: true,
    },
    () => {
      log(`serving on port ${port}`);
    },
  );
})();
