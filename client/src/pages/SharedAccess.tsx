import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Download, Lock, Building2, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, Wrench, Bug, Flame, Home, Sparkles } from "lucide-react";
import { PROPERTY_DATA } from "@/lib/constants";

export default function SharedAccess() {
  const { token } = useParams<{ token: string }>();
  const [, setLocation] = useLocation();
  const [hasAccess, setHasAccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    interest: ""
  });

  const { data: linkData, isLoading, error } = useQuery({
    queryKey: ["shareLink", token],
    queryFn: async () => {
      const response = await fetch(`/api/share-links/${token}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Link not found");
      }
      return response.json();
    }
  });

  const submitMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/share-links/${token}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error("Failed to submit");
      }
      
      return response.json();
    },
    onSuccess: () => {
      setHasAccess(true);
    }
  });

  useEffect(() => {
    if (linkData?.hasSubmitted) {
      setHasAccess(true);
    }
  }, [linkData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    submitMutation.mutate();
  };

  const documents = [
    { title: "Offering Memorandum", size: "12.4 MB", type: "PDF" },
    { title: "Rent Roll (Pro Forma)", size: "1.2 MB", type: "XLS" },
    { title: "Property Inspection Report", size: "8.5 MB", type: "PDF" },
    { title: "Title Report", size: "4.1 MB", type: "PDF" },
    { title: "Natural Hazards Disclosure", size: "3.2 MB", type: "PDF" },
    { title: "Floor Plans (CAD)", size: "15.8 MB", type: "ZIP" },
  ];

  const serviceContracts = [
    {
      category: "Security & Monitoring",
      icon: Shield,
      color: "bg-blue-50 text-blue-600",
      items: [
        { title: "ADT - Office Burglar Alarm", provider: "ADT Security" },
        { title: "ADT - Office Patrol Service", provider: "ADT Security" },
        { title: "ADT - Residence Burglar Alarm", provider: "ADT Security" },
      ]
    },
    {
      category: "Building Maintenance",
      icon: Wrench,
      color: "bg-orange-50 text-orange-600",
      items: [
        { title: "Elevator Maintenance", provider: "Galaxy Elevator" },
        { title: "HVAC Maintenance", provider: "MightyServ / Canoga Park H&AC" },
        { title: "Roll-up Doors Maintenance", provider: "Lawrence Roll-up Doors" },
      ]
    },
    {
      category: "Roofing",
      icon: Home,
      color: "bg-gray-100 text-gray-600",
      items: [
        { title: "TPO Roof System - 20yr Warranty", provider: "A-1 All American Roofing" },
      ]
    },
    {
      category: "Fire Safety",
      icon: Flame,
      color: "bg-red-50 text-red-600",
      items: [
        { title: "Fire Alarm Monitoring", provider: "Nite Owl Alarm and Video" },
      ]
    },
    {
      category: "Pest Control",
      icon: Bug,
      color: "bg-green-50 text-green-600",
      items: [
        { title: "Quarterly Pest Control", provider: "Terminix" },
        { title: "Termite Guarantees", provider: "Terminix" },
      ]
    },
    {
      category: "Cleaning & Grounds",
      icon: Sparkles,
      color: "bg-purple-50 text-purple-600",
      items: [
        { title: "Exterior/Office Cleaning & Gardening", provider: "G&J Maintenance LLC" },
      ]
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary mb-4" />
          <p className="text-muted-foreground">Validating access...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Link Not Valid</h2>
            <p className="text-muted-foreground mb-4">
              {(error as Error).message || "This link may have expired or is invalid."}
            </p>
            <Button onClick={() => setLocation("/")} data-testid="button-go-home">
              Visit Main Site
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans">
        <header className="bg-white border-b border-border">
          <div className="container mx-auto px-4 py-6 text-center">
            <h1 className="font-serif text-2xl font-bold text-primary">2224 Main Street</h1>
            <p className="text-muted-foreground text-sm mt-1">Exclusive Investment Documents</p>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <div className="max-w-lg mx-auto">
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="font-serif text-2xl">
                  {linkData?.recipientName ? `Welcome, ${linkData.recipientName}` : "Access Documents"}
                </CardTitle>
                <CardDescription>
                  Please provide your information to access the exclusive due diligence documents for 2224 Main Street.
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {linkData?.message && (
                  <div className="bg-gray-50 p-4 rounded-lg mb-6 border-l-4 border-primary">
                    <p className="text-sm italic">"{linkData.message}"</p>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Smith"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      data-testid="input-access-name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      data-testid="input-access-email"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      data-testid="input-access-phone"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      type="text"
                      placeholder="ABC Investments"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      data-testid="input-access-company"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="interest">Interest in Property</Label>
                    <Textarea
                      id="interest"
                      placeholder="Tell us about your interest in this property..."
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      rows={3}
                      data-testid="input-access-interest"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={!formData.name || !formData.email || submitMutation.isPending}
                    data-testid="button-access-submit"
                  >
                    {submitMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Access Documents
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <p className="text-center text-xs text-muted-foreground mt-6">
              Your information is kept confidential and will only be used to follow up on your interest in this property.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white border-b border-border sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="font-serif text-xl font-bold text-primary">2224 Main Street</h1>
            <div className="h-6 w-px bg-border" />
            <span className="text-sm text-muted-foreground">Document Access</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
              <CheckCircle2 className="w-3 h-3" />
              Access Granted
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader className="p-4 bg-primary text-white rounded-t-lg">
                <CardTitle className="text-lg font-serif">Property Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Listing Price</p>
                  <p className="text-xl font-bold font-serif">{PROPERTY_DATA.price}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Property Type</p>
                  <p className="text-sm font-medium">Mixed-Use (Retail + Residential)</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Location</p>
                  <p className="text-sm font-medium">Santa Monica, CA</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-green-800">Access Granted</p>
                <p className="text-sm text-green-700">
                  You now have access to all due diligence documents. Download individual files or use "Download All" for your underwriting team.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
              <div className="p-4 border-b border-border bg-gray-50 flex justify-between items-center">
                <h3 className="font-serif text-lg">Due Diligence Documents</h3>
                <Button size="sm" data-testid="button-download-all-docs">
                  <Download className="w-4 h-4 mr-2" />
                  Download All
                </Button>
              </div>
              <div className="divide-y divide-border">
                {documents.map((doc, idx) => (
                  <div key={idx} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors group" data-testid={`doc-item-${idx}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors">{doc.title}</p>
                        <p className="text-xs text-muted-foreground">{doc.type} • {doc.size}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" data-testid={`download-doc-${idx}`}>
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
              <div className="p-4 border-b border-border bg-gray-50 flex justify-between items-center">
                <div>
                  <h3 className="font-serif text-lg">Service Provider Contracts</h3>
                  <p className="text-sm text-muted-foreground mt-1">Active maintenance agreements - transferable to new owner</p>
                </div>
                <Button variant="outline" size="sm" data-testid="button-download-all-contracts">
                  <Download className="w-4 h-4 mr-2" />
                  Download All
                </Button>
              </div>
              <div className="p-4">
                <Accordion type="multiple" className="w-full space-y-3">
                  {serviceContracts.map((category, catIdx) => (
                    <AccordionItem 
                      key={catIdx} 
                      value={`category-${catIdx}`} 
                      className="border rounded-lg overflow-hidden"
                      data-testid={`shared-accordion-${catIdx}`}
                    >
                      <AccordionTrigger 
                        className="px-4 py-3 hover:no-underline hover:bg-gray-50"
                        data-testid={`shared-toggle-${catIdx}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${category.color}`}>
                            <category.icon className="w-5 h-5" />
                          </div>
                          <div className="text-left">
                            <p className="font-medium">{category.category}</p>
                            <p className="text-xs text-muted-foreground">{category.items.length} contract{category.items.length !== 1 ? 's' : ''}</p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-0 pb-0">
                        <div className="divide-y divide-border border-t">
                          {category.items.map((item, itemIdx) => (
                            <div 
                              key={itemIdx} 
                              className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                              data-testid={`shared-contract-item-${catIdx}-${itemIdx}`}
                            >
                              <div className="flex-1">
                                <p className="font-medium text-foreground">{item.title}</p>
                                <p className="text-xs text-muted-foreground">Provider: {item.provider}</p>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-muted-foreground hover:text-primary shrink-0"
                                data-testid={`shared-download-${catIdx}-${itemIdx}`}
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border bg-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Questions? Contact your broker directly for more information about 2224 Main Street.
          </p>
        </div>
      </footer>
    </div>
  );
}
