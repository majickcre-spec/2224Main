import { Switch, Route, useLocation } from "wouter";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import LeadsTable from "@/components/dashboard/LeadsTable";
import NurtureCampaign from "@/components/dashboard/NurtureCampaign";
import SocialContentGenerator from "@/components/dashboard/SocialContentGenerator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, Mail, TrendingUp, Calendar, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  qualifiedLeads: number;
  totalSignatures: number;
  sourceBreakdown: Record<string, number>;
}

interface AuthUser {
  id: string;
  email: string;
  name: string;
}

function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [, setLocation] = useLocation();

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const response = await fetch('/api/auth/me', { credentials: 'include' });
      const data = await response.json();
      
      if (data.authenticated) {
        setUser(data.user);
      } else {
        setLocation('/login');
      }
    } catch (error) {
      setLocation('/login');
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    setLocation('/login');
  }

  return { user, loading, logout };
}

function Overview() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const response = await fetch('/api/dashboard/stats', { credentials: 'include' });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-primary">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your marketing performance and incoming leads.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Leads", value: loading ? "..." : stats?.totalLeads.toString() || "0", icon: Users, trend: "All time" },
          { label: "New Leads", value: loading ? "..." : stats?.newLeads.toString() || "0", icon: Mail, trend: "Needs attention" },
          { label: "CA Signatures", value: loading ? "..." : stats?.totalSignatures.toString() || "0", icon: Calendar, trend: "Portal access" },
          { label: "Qualified Leads", value: loading ? "..." : stats?.qualifiedLeads.toString() || "0", icon: TrendingUp, trend: "Ready for follow-up" },
        ].map((stat) => (
          <Card key={stat.label} data-testid={`card-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid={`text-${stat.label.toLowerCase().replace(/\s+/g, '-')}-value`}>{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
            <CardDescription>Latest inquiries from all sources</CardDescription>
          </CardHeader>
          <CardContent>
            <LeadsTable />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nurture Pipeline</CardTitle>
            <CardDescription>Automated email sequence performance</CardDescription>
          </CardHeader>
          <CardContent>
            <NurtureCampaign />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function LeadsPage() {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-serif font-bold text-primary">Lead Management</h1>
        <p className="text-muted-foreground">Manage and track all prospective buyers.</p>
      </div>
      <LeadsTable />
    </div>
  );
}

function CampaignsPage() {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-serif font-bold text-primary">Nurture Campaigns</h1>
        <p className="text-muted-foreground">Automated email sequences for lead nurturing.</p>
      </div>
      <NurtureCampaign />
    </div>
  );
}

function SocialPage() {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-serif font-bold text-primary">AI Social Content Generator</h1>
        <p className="text-muted-foreground">Generate engaging social media posts for LinkedIn, Instagram, and Facebook.</p>
      </div>
      <SocialContentGenerator />
    </div>
  );
}

export default function Dashboard() {
  const [location] = useLocation();
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }
  
  let content;
  if (location === "/dashboard/leads") {
    content = <LeadsPage />;
  } else if (location === "/dashboard/campaigns") {
    content = <CampaignsPage />;
  } else if (location === "/dashboard/social") {
    content = <SocialPage />;
  } else {
    content = <Overview />;
  }

  return (
    <DashboardLayout user={user} onLogout={logout}>
      {content}
    </DashboardLayout>
  );
}
