import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileText, Download, Lock, ChevronLeft, Building2, TrendingUp, AlertCircle, Shield, Wrench, Bug, Flame, Home, Sparkles, Share2 } from "lucide-react";
import { PROPERTY_DATA } from "@/lib/constants";
import { ShareDocumentsModal } from "@/components/portal/ShareDocumentsModal";

export default function Portal() {
  const [activeTab, setActiveTab] = useState("docs");
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const documents = [
    { 
      title: "Phase I Environmental Report", 
      size: "30 MB", 
      type: "PDF", 
      date: "Mar 26, 2025",
      file: "/documents/environmental/25-483907.1_Phase_I_Final_Report_-_2224_Main_Street,_Santa_Monica,_CA_032625.pdf"
    },
    { 
      title: "Property Condition Assessment (PCA)", 
      size: "4.8 MB", 
      type: "PDF", 
      date: "Apr 17, 2025",
      file: "/documents/property-condition/25-483907.2_PCA_Final_Report_-_2224_Main_Street,_Santa_Monica,_CA_041725.pdf"
    },
    { 
      title: "Preliminary Title Report", 
      size: "560 KB", 
      type: "PDF", 
      date: "Feb 13, 2025",
      file: "/documents/title-report/PrelimPackage-2224  Main Street.pdf"
    },
    { 
      title: "Pre-Approved Purchase & Sale Agreement", 
      size: "2 MB", 
      type: "PDF", 
      date: "Mar 27, 2025",
      file: "/documents/purchase-agreement/Pre-approved PSA 032725.pdf"
    },
    { 
      title: "Floor Plans - Master Set (11x17)", 
      size: "1.7 MB", 
      type: "PDF", 
      date: "Oct 31, 2012",
      file: "/documents/architectural-plans/10.31.12_2224_Main_Street_binder 11x17 master FLOOR PLANS.pdf"
    },
    { 
      title: "Reflected Ceiling Plan - Lighting & Switches", 
      size: "890 KB", 
      type: "PDF", 
      date: "Apr 2, 2025",
      file: "/documents/architectural-plans/Reflected Ceiling PLan Lighting and Switches.pdf"
    },
    { 
      title: "Wet & Dry Utility Plan", 
      size: "830 KB", 
      type: "PDF", 
      date: "Apr 2, 2025",
      file: "/documents/architectural-plans/Wet and Dry Utility Plan.pdf"
    },
  ];

  const serviceContracts = [
    {
      category: "Security & Monitoring",
      icon: Shield,
      color: "bg-blue-50 text-blue-600",
      items: [
        { title: "ADT - Office Burglar Alarm", provider: "ADT Security", term: "Through Jan 2026", status: "Transferable", file: "/documents/service-providers/EXH_1_2024 ADT_2224 Main_OFFICE.pdf" },
        { title: "ADT - Office Patrol Service", provider: "ADT Security", term: "Through Jan 2026", status: "Transferable", file: "/documents/service-providers/EXH_2_Shaffer Sm Bus Armed Response 1.23.24.pdf - signed.pdf" },
        { title: "ADT - Residence Burglar Alarm", provider: "ADT Security", term: "Through Jan 2026", status: "Transferable", file: "/documents/service-providers/EXH_3 2024 ADT_2224 Main_RESIDENCE.pdf" },
        { title: "ADT - 137 Strand Burglar Alarm", provider: "ADT Security", term: "Through Jan 2026", status: "Transferable", file: "/documents/service-providers/EXH_16_2024 ADT_137 Strand_RESIDENCE.pdf" },
        { title: "ADT - 137 Strand Patrol Service", provider: "ADT Security", term: "Through Jun 2025", status: "Transferable", file: "/documents/service-providers/EXH_17_ADT_ Marcy Shaffer 6-12-2023 Patrol Contract.pdf" },
      ]
    },
    {
      category: "Building Maintenance",
      icon: Wrench,
      color: "bg-orange-50 text-orange-600",
      items: [
        { title: "Elevator Maintenance", provider: "Galaxy Elevator", term: "Semiannual", status: "Active - $440/year", file: "/documents/service-providers/EXH_5_06.09.21 GALAXY ELEVATOR SIGNED Planned Maintenance Residential Contract.pdf" },
        { title: "HVAC Maintenance", provider: "MightyServ / Canoga Park H&AC", term: "Semiannual", status: "Active", file: "/documents/service-providers/EXH_10_MightyServ Maintenance Brochure Updated April 2021.pdf" },
        { title: "Roll-up Doors Maintenance (3 doors)", provider: "Lawrence Roll-up Doors", term: "Annual", status: "Active - $785/visit", file: "/documents/service-providers/EXH_7_02.03.25_Lawrence_Roll-up_Doors_Marcy Shaffer PM PROPOSAL 2025_SIGNED & Motor Repair Proposal.pdf" },
      ]
    },
    {
      category: "Roofing",
      icon: Home,
      color: "bg-gray-100 text-gray-600",
      items: [
        { title: "TPO Roof System - Completed 2023", provider: "A-1 All American Roofing", term: "20-yr Material / 10-yr Labor Warranty", status: "Completed - $17,352", file: "/documents/service-providers/2224 Main St Roofing Proposal.pdf" },
        { title: "Roofing Invoice & Lien Release", provider: "A-1 All American Roofing", term: "Dec 2023", status: "Paid in Full", file: "/documents/service-providers/23-213-01 Invoice, Release and Permit.pdf" },
      ]
    },
    {
      category: "Fire Safety",
      icon: Flame,
      color: "bg-red-50 text-red-600",
      items: [
        { title: "Fire Alarm Monitoring", provider: "Nite Owl Alarm and Video", term: "Quarterly", status: "Active", file: "/documents/service-providers/EXH_11_01.03.24 NITE OWL agreements re fire alarm.pdf" },
        { title: "Fire System Maintenance", provider: "Marx Bros.", term: "Annual", status: "Works with Nite Owl", file: null },
      ]
    },
    {
      category: "Pest Control",
      icon: Bug,
      color: "bg-green-50 text-green-600",
      items: [
        { title: "Quarterly Pest Control", provider: "Terminix", term: "Quarterly", status: "Active - $299.27/quarter", file: "/documents/service-providers/EXH_12_2024 Terminix quarterly pest service.pdf" },
        { title: "Drywood Termite Guarantee", provider: "Terminix", term: "Annual", status: "Transferable", file: "/documents/service-providers/EXH_13_06.01.14 Terminix DRYWOOD TERMITE GUARANTEE.pdf" },
        { title: "Subterranean Termite Guarantee", provider: "Terminix", term: "Annual", status: "Transferable", file: "/documents/service-providers/EXH_14_08.27.20 Terminix renewal of subterranean termite plan.pdf" },
      ]
    },
    {
      category: "Cleaning & Grounds",
      icon: Sparkles,
      color: "bg-purple-50 text-purple-600",
      items: [
        { title: "Exterior Cleaning, Office Cleaning & Gardening", provider: "G&J Maintenance LLC", term: "Monthly", status: "Active - Both properties", file: "/documents/service-providers/EXH_4_11.01.24_G&J Cleaning services contract 1029-2_FULLY_SIGNED.pdf" },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Portal Header */}
      <header className="bg-white border-b border-border sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/">
              <a className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
                <ChevronLeft className="w-4 h-4" />
                Back to Public Site
              </a>
            </Link>
            <div className="h-6 w-px bg-border" />
            <h1 className="font-serif text-xl font-bold text-primary">Investor Portal: 2224 Main St</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
              <Lock className="w-3 h-3" />
              Secure Access Granted
            </div>
            <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-serif text-sm">
              JD
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader className="p-4 bg-primary text-white rounded-t-lg">
                <CardTitle className="text-lg font-serif">Deal Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Listing Price</p>
                  <p className="text-xl font-bold font-serif">{PROPERTY_DATA.price}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Total SF</p>
                  <p className="text-sm font-medium">11,382 SF (Total)</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Status</p>
                  <p className="text-sm font-medium text-green-600">Active / Accepting Offers</p>
                </div>
                <Button className="w-full mt-4 bg-accent hover:bg-accent/90 text-white" data-testid="button-make-offer">
                  Make an Offer
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full mt-2" 
                  onClick={() => setShareModalOpen(true)}
                  data-testid="button-share-with-client"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share with Client
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Key Contacts</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                {PROPERTY_DATA.contacts.slice(0, 2).map((c) => (
                  <div key={c.name} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-primary shrink-0">
                      {c.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.role}</p>
                      <a href={`mailto:${c.email}`} className="text-xs text-accent hover:underline block mt-1">{c.email}</a>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="docs" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start bg-white border-b border-border rounded-none h-auto p-0 mb-6">
                <TabsTrigger 
                  value="docs" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-4 px-6 text-sm font-medium"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Due Diligence
                </TabsTrigger>
                <TabsTrigger 
                  value="services" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-4 px-6 text-sm font-medium"
                >
                  <Wrench className="w-4 h-4 mr-2" />
                  Service Contracts
                </TabsTrigger>
                <TabsTrigger 
                  value="financials" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-4 px-6 text-sm font-medium"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Financials
                </TabsTrigger>
                <TabsTrigger 
                  value="property" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-4 px-6 text-sm font-medium"
                >
                  <Building2 className="w-4 h-4 mr-2" />
                  Property Info
                </TabsTrigger>
              </TabsList>

              <TabsContent value="docs" className="mt-0">
                <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-border bg-gray-50 flex justify-between items-center">
                    <h3 className="font-serif text-lg">Document Room</h3>
                    <Button variant="outline" size="sm" className="h-8 text-xs">Download All (.zip)</Button>
                  </div>
                  <div className="divide-y divide-border">
                    {documents.map((doc, idx) => (
                      <div key={idx} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground group-hover:text-primary transition-colors">{doc.title}</p>
                            <p className="text-xs text-muted-foreground">{doc.type} • {doc.size} • Added {doc.date}</p>
                          </div>
                        </div>
                        <a 
                          href={doc.file} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center h-10 w-10 rounded-md text-muted-foreground hover:text-primary hover:bg-accent/10 transition-colors"
                          data-testid={`download-doc-${idx}`}
                        >
                          <Download className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="services" className="mt-0">
                <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-border bg-gray-50 flex justify-between items-center">
                    <div>
                      <h3 className="font-serif text-lg">Service Provider Contracts</h3>
                      <p className="text-sm text-muted-foreground mt-1">All active maintenance agreements and service contracts - transferable to new owner</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <Accordion type="multiple" className="w-full space-y-3">
                      {serviceContracts.map((category, catIdx) => (
                        <AccordionItem 
                          key={catIdx} 
                          value={`category-${catIdx}`} 
                          className="border rounded-lg overflow-hidden"
                          data-testid={`accordion-${category.category.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          <AccordionTrigger 
                            className="px-4 py-3 hover:no-underline hover:bg-gray-50"
                            data-testid={`toggle-${category.category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`}
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
                                  data-testid={`contract-item-${catIdx}-${itemIdx}`}
                                >
                                  <div className="flex-1">
                                    <p className="font-medium text-foreground">{item.title}</p>
                                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                                      <p className="text-xs text-muted-foreground">
                                        <span className="font-medium">Provider:</span> {item.provider}
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        <span className="font-medium">Term:</span> {item.term}
                                      </p>
                                      <p className="text-xs">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                          item.status.includes('Transferable') ? 'bg-green-100 text-green-700' : 
                                          item.status.includes('Active') ? 'bg-blue-100 text-blue-700' :
                                          item.status.includes('Completed') || item.status.includes('Paid') ? 'bg-gray-100 text-gray-700' :
                                          'bg-yellow-100 text-yellow-700'
                                        }`}>
                                          {item.status}
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                  {item.file && (
                                    <a 
                                      href={item.file}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center justify-center h-10 w-10 rounded-md text-muted-foreground hover:text-primary hover:bg-accent/10 transition-colors shrink-0"
                                      data-testid={`download-${catIdx}-${itemIdx}`}
                                    >
                                      <Download className="w-4 h-4" />
                                    </a>
                                  )}
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="financials">
                <div className="bg-white rounded-lg border border-border p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="font-serif text-xl mb-2">Restricted Access</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    Detailed financials including P&L statements and tax returns require secondary approval from the listing broker.
                  </p>
                  <Button>Request Access</Button>
                </div>
              </TabsContent>

              <TabsContent value="property">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg border border-border p-6">
                    <h3 className="font-serif text-lg mb-4">Zoning & Use</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-muted-foreground">Zoning</span>
                        <span className="font-medium">SM-MU (Mixed Use)</span>
                      </li>
                      <li className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-muted-foreground">APN</span>
                        <span className="font-medium">4287-012-004</span>
                      </li>
                      <li className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-muted-foreground">Lot Size</span>
                        <span className="font-medium">5,196 SF</span>
                      </li>
                      <li className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-muted-foreground">Building Size</span>
                        <span className="font-medium">11,382 SF</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg border border-border p-6">
                    <h3 className="font-serif text-lg mb-4">Utilities</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-muted-foreground">Electricity</span>
                        <span className="font-medium">SCE (Separately Metered)</span>
                      </li>
                      <li className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-muted-foreground">Gas</span>
                        <span className="font-medium">SoCal Gas</span>
                      </li>
                      <li className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-muted-foreground">Water</span>
                        <span className="font-medium">City of Santa Monica</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <ShareDocumentsModal 
        open={shareModalOpen} 
        onOpenChange={setShareModalOpen} 
      />
    </div>
  );
}
