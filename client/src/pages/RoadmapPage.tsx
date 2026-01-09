import { useEffect, useState } from "react";
import { useParams } from "wouter";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Circle, 
  Clock,
  Building2,
  MessageSquare,
  Mail,
  Phone,
  FileText,
  Shield,
  Share2,
  BarChart3,
  Users,
  Bot,
  Sparkles,
  Video,
  Map,
  Calculator,
  Briefcase,
  Zap,
  Database,
  Globe,
  Lock,
  TrendingUp,
  Calendar,
  Send,
  UserCheck,
  FolderOpen,
  Search,
  Target
} from "lucide-react";

type FeatureStatus = "shipped" | "partial" | "planned";

interface Feature {
  name: string;
  description: string;
  status: FeatureStatus;
  icon: React.ElementType;
  details?: string[];
  priority?: "high" | "medium" | "low";
}

interface FeatureCategory {
  title: string;
  features: Feature[];
}

const roadmapData: FeatureCategory[] = [
  {
    title: "Marketing Website",
    features: [
      {
        name: "Property Showcase Hero",
        description: "Full-screen hero with property highlights and call-to-action",
        status: "shipped",
        icon: Building2,
        details: ["Responsive design", "Animated elements", "Mobile optimized"]
      },
      {
        name: "Property Story Section",
        description: "Compelling narrative about the property and investment opportunity",
        status: "shipped",
        icon: FileText,
        details: ["Key highlights", "Investment thesis", "Property specs"]
      },
      {
        name: "Photo Gallery",
        description: "High-quality property images with lightbox viewing",
        status: "shipped",
        icon: Globe,
        details: ["Image carousel", "Full-screen viewing", "Mobile swipe"]
      },
      {
        name: "Location & Map",
        description: "Interactive map with nearby amenities and transportation",
        status: "shipped",
        icon: Map,
        details: ["Google Maps integration", "Points of interest", "Walkability info"]
      },
      {
        name: "Contact Form & Lead Capture",
        description: "Form to capture investor inquiries with validation",
        status: "shipped",
        icon: Users,
        details: ["Form validation", "Database storage", "Email notification trigger"]
      },
      {
        name: "Virtual Tour",
        description: "Immersive 3D walkthrough or video tour of the property",
        status: "partial",
        icon: Video,
        details: ["UI placeholder exists", "Needs tour asset integration", "Matterport or video embed"],
        priority: "medium"
      }
    ]
  },
  {
    title: "AI Chatbot",
    features: [
      {
        name: "Chatbot Widget UI",
        description: "Floating chat interface for visitor questions",
        status: "shipped",
        icon: MessageSquare,
        details: ["Chat bubble interface", "Message history", "Typing indicators"]
      },
      {
        name: "AI Property Q&A",
        description: "GPT-4 powered responses to property questions",
        status: "shipped",
        icon: Bot,
        details: ["OpenAI integration", "Property-specific training", "Natural conversation"]
      },
      {
        name: "Lead Handoff",
        description: "Capture contact info during chat and route to CRM",
        status: "planned",
        icon: UserCheck,
        details: ["Contact capture prompts", "Lead scoring", "CRM integration"],
        priority: "high"
      }
    ]
  },
  {
    title: "Investor Portal",
    features: [
      {
        name: "Portal Landing Page",
        description: "Gated entry point for qualified investors",
        status: "shipped",
        icon: Lock,
        details: ["Professional design", "Value proposition", "Access request"]
      },
      {
        name: "NDA/CA Signing Flow",
        description: "Electronic confidentiality agreement signing",
        status: "shipped",
        icon: Shield,
        details: ["Digital signature capture", "Email verification", "Database storage"]
      },
      {
        name: "Document Catalog",
        description: "Organized library of due diligence documents",
        status: "shipped",
        icon: FolderOpen,
        details: ["Categorized folders", "Preview capability", "Download tracking"]
      },
      {
        name: "Document Upload & Versioning",
        description: "Admin ability to upload and manage document versions",
        status: "planned",
        icon: Database,
        details: ["File upload UI", "Version history", "Replace/archive"],
        priority: "high"
      },
      {
        name: "Granular Access Permissions",
        description: "Control which investors see which documents",
        status: "planned",
        icon: UserCheck,
        details: ["Role-based access", "Document-level permissions", "Audit trail"],
        priority: "medium"
      }
    ]
  },
  {
    title: "Lead Management",
    features: [
      {
        name: "Lead Database",
        description: "Store and organize all captured leads",
        status: "shipped",
        icon: Database,
        details: ["PostgreSQL storage", "Full lead profiles", "Status tracking"]
      },
      {
        name: "Admin Dashboard",
        description: "Overview of leads, campaigns, and activity",
        status: "shipped",
        icon: BarChart3,
        details: ["Key metrics", "Recent activity", "Quick actions"]
      },
      {
        name: "Lead Table & Filtering",
        description: "Searchable, sortable list of all leads",
        status: "shipped",
        icon: Users,
        details: ["Search functionality", "Status filters", "Export capability"]
      },
      {
        name: "Lead Scoring & Segmentation",
        description: "Automatically score and segment leads by engagement",
        status: "planned",
        icon: Target,
        details: ["Engagement scoring", "Auto-segmentation", "Priority flagging"],
        priority: "medium"
      }
    ]
  },
  {
    title: "Email Nurturing",
    features: [
      {
        name: "Email Templates",
        description: "Pre-built email sequence templates",
        status: "shipped",
        icon: Mail,
        details: ["Welcome email", "Follow-up sequence", "Property updates"]
      },
      {
        name: "Nurture Campaign Framework",
        description: "Multi-step email campaign structure",
        status: "partial",
        icon: Send,
        details: ["Campaign definitions", "Needs scheduling logic", "Needs email provider"],
        priority: "high"
      },
      {
        name: "Email Provider Integration",
        description: "Connect to Resend or SendGrid for delivery",
        status: "planned",
        icon: Zap,
        details: ["API integration", "Delivery tracking", "Bounce handling"],
        priority: "high"
      },
      {
        name: "Behavior-Triggered Emails",
        description: "Auto-send emails based on user actions",
        status: "planned",
        icon: Calendar,
        details: ["Document view triggers", "Portal visit triggers", "Time-based triggers"],
        priority: "medium"
      }
    ]
  },
  {
    title: "SMS Nurturing",
    features: [
      {
        name: "SMS Templates",
        description: "Pre-built text message sequence templates",
        status: "shipped",
        icon: Phone,
        details: ["Welcome SMS", "Follow-up messages", "Meeting reminders"]
      },
      {
        name: "SMS Campaign Framework",
        description: "Multi-step SMS campaign structure",
        status: "partial",
        icon: MessageSquare,
        details: ["Campaign definitions", "Needs scheduling logic", "Needs Twilio"],
        priority: "high"
      },
      {
        name: "Twilio Integration",
        description: "Connect to Twilio for SMS delivery",
        status: "planned",
        icon: Zap,
        details: ["API integration", "Two-way messaging", "Delivery status"],
        priority: "high"
      }
    ]
  },
  {
    title: "AI Sales Agent",
    features: [
      {
        name: "AI Email Agent",
        description: "AI-written personalized email outreach and follow-ups",
        status: "planned",
        icon: Mail,
        details: ["AI copywriting", "Personalization", "Response handling", "Smart timing"],
        priority: "high"
      },
      {
        name: "AI SMS Agent",
        description: "AI-powered text conversations with leads",
        status: "planned",
        icon: MessageSquare,
        details: ["Two-way AI chat", "Question handling", "Meeting scheduling"],
        priority: "high"
      },
      {
        name: "AI Warm Calling",
        description: "AI voice agent for follow-up calls with warm leads",
        status: "planned",
        icon: Phone,
        details: ["Voice AI integration", "Call transcripts", "Appointment booking"],
        priority: "medium"
      },
      {
        name: "AI Cold Calling",
        description: "AI voice agent for initial outreach to prospects",
        status: "planned",
        icon: Phone,
        details: ["Prospect lists", "Script customization", "Lead qualification"],
        priority: "low"
      }
    ]
  },
  {
    title: "Content & Social",
    features: [
      {
        name: "AI Social Content Generator",
        description: "Generate social media posts for any platform",
        status: "shipped",
        icon: Sparkles,
        details: ["LinkedIn posts", "Instagram captions", "Twitter threads", "Email blasts"]
      },
      {
        name: "Content Calendar",
        description: "Schedule and plan social media content",
        status: "planned",
        icon: Calendar,
        details: ["Post scheduling", "Platform management", "Analytics"],
        priority: "low"
      }
    ]
  },
  {
    title: "Document Sharing",
    features: [
      {
        name: "Share Link Generation",
        description: "Create secure, trackable links to share documents",
        status: "shipped",
        icon: Share2,
        details: ["Token-based security", "Expiration controls", "Activity tracking"]
      },
      {
        name: "Shared Access Page",
        description: "Public page for accessing shared documents",
        status: "partial",
        icon: Globe,
        details: ["Lead capture form", "Document access", "Needs full pipeline"],
        priority: "medium"
      },
      {
        name: "View & Download Analytics",
        description: "Track who viewed and downloaded each document",
        status: "planned",
        icon: BarChart3,
        details: ["View timestamps", "Download logs", "Engagement reports"],
        priority: "medium"
      }
    ]
  },
  {
    title: "Analytics & Valuations",
    features: [
      {
        name: "AI Market Studies",
        description: "Automated market analysis and comparable reports",
        status: "planned",
        icon: Search,
        details: ["Market data integration", "AI analysis", "Report generation"],
        priority: "medium"
      },
      {
        name: "AI Property Valuations",
        description: "AI-powered property value estimates",
        status: "planned",
        icon: Calculator,
        details: ["Comp analysis", "Cap rate modeling", "Value range estimates"],
        priority: "medium"
      },
      {
        name: "CRM Integration",
        description: "Sync leads and activities with external CRM",
        status: "planned",
        icon: Briefcase,
        details: ["Salesforce", "HubSpot", "Custom integrations"],
        priority: "low"
      }
    ]
  }
];

const statusConfig = {
  shipped: { label: "Shipped", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20", icon: CheckCircle2 },
  partial: { label: "In Progress", color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20", icon: Clock },
  planned: { label: "Planned", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", icon: Circle }
};

const priorityConfig = {
  high: { label: "High Priority", color: "text-red-400" },
  medium: { label: "Medium Priority", color: "text-yellow-400" },
  low: { label: "Low Priority", color: "text-slate-400" }
};

export default function RoadmapPage() {
  const { token } = useParams<{ token: string }>();
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [filter, setFilter] = useState<FeatureStatus | "all">("all");

  useEffect(() => {
    const validateToken = async () => {
      if (token === "roadmap2024private") {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    };
    validateToken();
  }, [token]);

  if (isValid === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="animate-pulse text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!isValid) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-slate-400">Invalid access token</p>
        </div>
      </div>
    );
  }

  const getFilteredCategories = () => {
    if (filter === "all") return roadmapData;
    return roadmapData.map(category => ({
      ...category,
      features: category.features.filter(f => f.status === filter)
    })).filter(category => category.features.length > 0);
  };

  const getCounts = () => {
    const all = roadmapData.flatMap(c => c.features);
    return {
      shipped: all.filter(f => f.status === "shipped").length,
      partial: all.filter(f => f.status === "partial").length,
      planned: all.filter(f => f.status === "planned").length,
      total: all.length
    };
  };

  const counts = getCounts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-white/10 sticky top-0 bg-slate-900/80 backdrop-blur-lg z-50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Product Roadmap</h1>
              <p className="text-slate-400 text-sm">2224 Main Street AI Marketing Platform</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === "all" ? "bg-white text-slate-900" : "bg-white/10 text-white hover:bg-white/20"
                }`}
                data-testid="filter-all"
              >
                All ({counts.total})
              </button>
              <button
                onClick={() => setFilter("shipped")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === "shipped" ? "bg-green-500 text-white" : "bg-green-500/10 text-green-400 hover:bg-green-500/20"
                }`}
                data-testid="filter-shipped"
              >
                Shipped ({counts.shipped})
              </button>
              <button
                onClick={() => setFilter("partial")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === "partial" ? "bg-yellow-500 text-white" : "bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20"
                }`}
                data-testid="filter-partial"
              >
                In Progress ({counts.partial})
              </button>
              <button
                onClick={() => setFilter("planned")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === "planned" ? "bg-blue-500 text-white" : "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                }`}
                data-testid="filter-planned"
              >
                Planned ({counts.planned})
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Overview */}
      <section className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-400">{counts.shipped}</div>
            <div className="text-slate-400 text-sm mt-1">Shipped</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-yellow-400">{counts.partial}</div>
            <div className="text-slate-400 text-sm mt-1">In Progress</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-400">{counts.planned}</div>
            <div className="text-slate-400 text-sm mt-1">Planned</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-400">{Math.round((counts.shipped / counts.total) * 100)}%</div>
            <div className="text-slate-400 text-sm mt-1">Complete</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-6 bg-slate-700 rounded-full h-3 overflow-hidden">
          <div className="h-full flex">
            <div 
              className="bg-green-500 transition-all duration-500" 
              style={{ width: `${(counts.shipped / counts.total) * 100}%` }}
            />
            <div 
              className="bg-yellow-500 transition-all duration-500" 
              style={{ width: `${(counts.partial / counts.total) * 100}%` }}
            />
          </div>
        </div>
      </section>

      {/* Feature Categories */}
      <section className="container mx-auto px-6 pb-16">
        <div className="space-y-8">
          {getFilteredCategories().map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
            >
              <div className="bg-white/5 px-6 py-4 border-b border-white/10">
                <h2 className="text-xl font-semibold">{category.title}</h2>
              </div>
              <div className="p-6">
                <div className="grid gap-4">
                  {category.features.map((feature, featureIndex) => {
                    const status = statusConfig[feature.status];
                    const StatusIcon = status.icon;
                    const FeatureIcon = feature.icon;
                    
                    return (
                      <motion.div
                        key={feature.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (categoryIndex * 0.1) + (featureIndex * 0.05) }}
                        className={`${status.bg} ${status.border} border rounded-xl p-4`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-lg ${status.bg} flex items-center justify-center shrink-0`}>
                            <FeatureIcon className={`w-5 h-5 ${status.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-semibold">{feature.name}</h3>
                              <span className={`inline-flex items-center gap-1 text-xs ${status.color}`}>
                                <StatusIcon className="w-3 h-3" />
                                {status.label}
                              </span>
                              {feature.priority && feature.status !== "shipped" && (
                                <span className={`text-xs ${priorityConfig[feature.priority].color}`}>
                                  {priorityConfig[feature.priority].label}
                                </span>
                              )}
                            </div>
                            <p className="text-slate-400 text-sm mt-1">{feature.description}</p>
                            {feature.details && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {feature.details.map((detail, i) => (
                                  <span key={i} className="text-xs bg-white/5 px-2 py-1 rounded">
                                    {detail}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-slate-500 text-sm">
            Private roadmap document. Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </footer>
    </div>
  );
}
