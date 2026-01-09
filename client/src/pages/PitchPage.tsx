import { useEffect, useState } from "react";
import { useParams } from "wouter";
import { motion } from "framer-motion";
import { 
  Brain, 
  MessageSquare, 
  Mail, 
  Users, 
  FileText, 
  Share2, 
  BarChart3, 
  Zap, 
  Shield, 
  TrendingUp,
  Bot,
  Sparkles,
  Clock,
  DollarSign,
  Target,
  Rocket,
  CheckCircle,
  ArrowRight,
  Building2,
  Handshake,
  Calendar,
  Phone
} from "lucide-react";

export default function PitchPage() {
  const { token } = useParams<{ token: string }>();
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await fetch(`/api/pitch/${token}`);
        if (response.ok) {
          setIsValid(true);
        } else {
          const data = await response.json();
          setError(data.error || "Invalid or expired link");
          setIsValid(false);
        }
      } catch {
        setError("Failed to validate access");
        setIsValid(false);
      }
    };
    validateToken();
  }, [token]);

  if (isValid === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="animate-pulse text-white text-xl">Loading presentation...</div>
      </div>
    );
  }

  if (!isValid) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-slate-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)]" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="container mx-auto px-6 text-center relative z-10"
        >
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8">
            <Building2 className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300">AI-Powered Listing Services for Commercial Brokers</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
            Sell Listings Faster<br />
            <span className="text-4xl md:text-5xl">While You Focus on Closing Deals</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto mb-12 leading-relaxed">
            I provide AI-powered marketing automation that handles your entire listing lifecycle — 
            from lead capture to nurturing to document management. You focus on relationships and negotiations. 
            I handle everything else.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-4xl font-bold text-green-400">90%</div>
              <div className="text-slate-400 text-sm mt-1">Less Marketing Time</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-4xl font-bold text-blue-400">24/7</div>
              <div className="text-slate-400 text-sm mt-1">Lead Engagement</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-4xl font-bold text-purple-400">3x</div>
              <div className="text-slate-400 text-sm mt-1">More Listings Capacity</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* The Problem for Brokers */}
      <section className="py-24 bg-slate-800/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">The Challenge You Face</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              You're great at closing deals. But marketing, lead follow-up, and administrative tasks eat up your time.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Clock, title: "Time Drain", desc: "Creating marketing materials, responding to inquiries, and following up with leads takes 20+ hours per listing. That's time not spent prospecting or closing." },
              { icon: DollarSign, title: "High Marketing Costs", desc: "Hiring marketing coordinators, photographers, and graphic designers for each listing cuts into your commission. Quality marketing shouldn't cost $5-10K per property." },
              { icon: Users, title: "Leads Fall Through", desc: "When you're in meetings or showing properties, inquiries go unanswered. 78% of buyers work with the first broker who responds. Delayed responses = lost deals." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-red-500/5 border border-red-500/20 rounded-2xl p-8"
              >
                <item.icon className="w-12 h-12 text-red-400 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">What I Deliver For Your Listings</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              A complete AI-powered marketing system that runs 24/7, costs a fraction of traditional methods, 
              and frees you to take on more listings.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: Bot, 
                title: "AI Property Concierge", 
                desc: "A GPT-4 powered chatbot on your listing page that answers investor questions instantly — property specs, financials, location details, zoning — all 24/7. Never miss an inquiry again.",
                details: ["Trained on your specific property data", "Handles complex investor questions", "Qualifies leads automatically", "Captures contact info seamlessly"]
              },
              { 
                icon: Phone, 
                title: "AI Sales Agent — Calling", 
                desc: "AI-powered warm and cold calling that engages prospects on your behalf. The AI handles initial outreach, qualification calls, and follow-ups — freeing you from hours of phone time.",
                details: ["Warm lead follow-up calls", "Cold outreach campaigns", "Natural conversation AI", "Call transcripts & summaries", "Appointment scheduling"]
              },
              { 
                icon: MessageSquare, 
                title: "AI Sales Agent — Texting", 
                desc: "Intelligent SMS conversations that feel human. The AI texts leads, answers questions, schedules meetings, and nurtures relationships via text — all automatically.",
                details: ["Two-way AI conversations", "Instant lead response", "Meeting coordination", "98% open rate vs email", "Personalized messaging"]
              },
              { 
                icon: Mail, 
                title: "AI Sales Agent — Email", 
                desc: "AI-crafted email sequences that adapt to each lead. From personalized outreach to multi-step nurturing campaigns, the AI writes, sends, and follows up automatically.",
                details: ["Personalized AI-written emails", "Behavior-triggered sequences", "Open/click tracking", "Smart follow-up timing", "Response handling"]
              },
              { 
                icon: Sparkles, 
                title: "AI Content Generator", 
                desc: "Need a LinkedIn post? Instagram caption? Email blast? The AI generates professional, engaging marketing content for any platform in seconds. Consistent branding, zero effort.",
                details: ["One-click social media posts", "Property-specific messaging", "Multiple platform formats", "Maintains your voice and brand"]
              },
              { 
                icon: Shield, 
                title: "Secure Investor Portal", 
                desc: "A professional, password-protected portal where qualified investors sign NDAs electronically and access due diligence documents. Tracks who viewed what and when.",
                details: ["Electronic NDA signing", "Document access controls", "View/download tracking", "Branded portal experience"]
              },
              { 
                icon: FileText, 
                title: "Deal Room & Transaction Management", 
                desc: "A complete digital deal room for managing the entire transaction lifecycle. Document organization, version control, stakeholder access, and closing checklists — all in one place.",
                details: ["Organized document library", "Stakeholder permissions", "Activity tracking", "Transaction timeline", "Secure file sharing"]
              },
              { 
                icon: Share2, 
                title: "Broker Share Links", 
                desc: "Generate secure, trackable links to share documents with your clients. When they forward to their investors, the system captures those leads for you automatically.",
                details: ["Token-based security", "Automatic lead capture", "Expiration controls", "Activity notifications"]
              },
              { 
                icon: BarChart3, 
                title: "Lead Analytics Dashboard", 
                desc: "Real-time visibility into your marketing performance. See who's viewing your listing, which leads are hot, and where your deals are in the pipeline.",
                details: ["Lead source tracking", "Engagement scoring", "Pipeline visualization", "Activity reports"]
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-slate-400 mb-4">{item.desc}</p>
                <ul className="space-y-2">
                  {item.details.map((detail, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-slate-800/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">How We Work Together</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              You bring the listing. I handle the entire marketing machine from day one.
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            {[
              { step: "1", title: "You Sign the Listing", desc: "Send me the property details, photos, and any existing marketing materials. I'll take it from there." },
              { step: "2", title: "I Build Your Marketing Hub", desc: "Within 48 hours, your property has a full website, AI chatbot, investor portal, and automated nurture campaigns — all live and working." },
              { step: "3", title: "AI Engages Every Lead 24/7", desc: "Visitors get instant responses. Leads are captured, qualified, and nurtured automatically. You get notifications for hot prospects." },
              { step: "4", title: "You Close the Deal", desc: "Focus on showings, negotiations, and relationships. I handle all the marketing follow-up and document sharing in the background." },
              { step: "5", title: "Repeat with More Listings", desc: "With marketing automated, you have capacity for 3x more listings. More listings = more closings = more commission." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-6 mb-8"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xl font-bold shrink-0">
                  {item.step}
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex-1">
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-slate-400">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Comparison */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Traditional vs. AI-Powered Marketing</h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-red-500/5 border border-red-500/20 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6 text-red-400">Traditional Approach</h3>
              <ul className="space-y-4">
                {[
                  "Hire marketing coordinator ($60K+/year)",
                  "Pay for each brochure, website, video",
                  "Manual lead follow-up (often delayed)",
                  "Limited to business hours",
                  "Inconsistent messaging across channels",
                  "No tracking on document views",
                  "Time spent on admin, not selling"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <span className="text-red-400 mt-1">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-green-500/5 border border-green-500/20 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6 text-green-400">With My AI System</h3>
              <ul className="space-y-4">
                {[
                  "Flat fee per listing (fraction of the cost)",
                  "Complete marketing hub included",
                  "Instant AI responses to all inquiries",
                  "Works 24/7/365 — never sleeps",
                  "Consistent, professional messaging",
                  "Full analytics on every interaction",
                  "Your time freed for high-value activities"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Opportunity */}
      <section className="py-24 bg-slate-800/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">The Opportunity</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              This isn't just about one listing. It's about scaling your business.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { 
                icon: TrendingUp, 
                title: "Take On More Listings", 
                desc: "When marketing runs itself, you can handle 3x the volume. More listings = more opportunities to close." 
              },
              { 
                icon: Handshake, 
                title: "Win More Pitches", 
                desc: "Show sellers your AI-powered marketing system. It's a competitive advantage that helps you win listings." 
              },
              { 
                icon: Target, 
                title: "Focus on What Matters", 
                desc: "Spend your time on client relationships, negotiations, and prospecting — the high-value work only you can do." 
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center bg-white/5 border border-white/10 rounded-2xl p-8"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Capabilities */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">On the Roadmap</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              The platform continues to evolve with new AI capabilities.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { title: "AI Market Studies", desc: "Automated market analysis and comp reports" },
              { title: "AI Property Valuations", desc: "Instant AI-powered property valuations" },
              { title: "CRM Integration", desc: "Sync with your existing CRM" },
              { title: "Video Tour AI", desc: "Auto-narrated property videos" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 text-center"
              >
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-800/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 mb-8">
              <Calendar className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-300">Let's Talk</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Scale Your Listings?</h2>
            
            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
              Let's discuss how AI-powered marketing can help you sell listings faster, 
              take on more properties, and focus on what you do best — closing deals.
            </p>
            
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Schedule a Demo</h3>
              <p className="text-blue-100 mb-6">
                See the full platform in action and get a custom quote for your listings.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:contact@2224main.com?subject=AI%20Marketing%20Demo%20Request"
                  className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors"
                  data-testid="button-contact-demo"
                >
                  <Mail className="w-5 h-5" />
                  Request Demo
                </a>
                <a 
                  href="tel:+13105551234"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-colors border border-white/20"
                  data-testid="button-call"
                >
                  <Phone className="w-5 h-5" />
                  Call Direct
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-slate-400 text-sm">
            AI-Powered Listing Marketing Services
          </p>
          <p className="text-slate-500 text-xs mt-2">
            Confidential presentation for commercial real estate professionals.
          </p>
        </div>
      </footer>
    </div>
  );
}
