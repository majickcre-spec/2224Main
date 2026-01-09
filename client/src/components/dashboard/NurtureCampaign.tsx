import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Clock, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

export default function NurtureCampaign() {
  const steps = [
    {
      id: 1,
      title: "Immediate Response",
      description: "Sent immediately after LoopNet inquiry",
      type: "Email",
      delay: "Instant",
      status: "Active",
      stats: { sent: 142, openRate: "68%", clickRate: "42%" }
    },
    {
      id: 2,
      title: "Property Highlights",
      description: "Showcase of the residence and office interiors",
      type: "Email",
      delay: "24 Hours",
      status: "Active",
      stats: { sent: 110, openRate: "55%", clickRate: "31%" }
    },
    {
      id: 3,
      title: "Neighborhood Insights",
      description: "Santa Monica market data and location stats",
      type: "Email",
      delay: "3 Days",
      status: "Active",
      stats: { sent: 89, openRate: "48%", clickRate: "24%" }
    },
    {
      id: 4,
      title: "Offer & Tour CTA",
      description: "Direct call to action to schedule viewing",
      type: "Email",
      delay: "7 Days",
      status: "Active",
      stats: { sent: 65, openRate: "42%", clickRate: "18%" }
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Campaign Visualizer */}
      <div className="lg:col-span-2 space-y-8">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gray-200" />

          {steps.map((step, index) => (
            <div key={step.id} className="relative flex gap-6 mb-8 last:mb-0 group">
              {/* Node Icon */}
              <div className="relative z-10 w-12 h-12 rounded-full bg-white border-2 border-primary flex items-center justify-center shadow-sm group-hover:border-accent transition-colors">
                <Mail className="w-5 h-5 text-primary group-hover:text-accent" />
              </div>

              {/* Content Card */}
              <div className="flex-1">
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base font-bold text-gray-900">{step.title}</CardTitle>
                        <CardDescription className="text-xs mt-1">{step.description}</CardDescription>
                      </div>
                      <Badge variant="secondary" className="bg-green-50 text-green-700">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        {step.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                        <Clock className="w-3 h-3" />
                        Wait {step.delay}
                      </div>
                      <span>•</span>
                      <span>Type: {step.type}</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 py-2 border-t border-gray-100">
                      <div>
                        <span className="block text-lg font-bold text-gray-900">{step.stats.sent}</span>
                        <span className="text-[10px] uppercase text-gray-400">Sent</span>
                      </div>
                      <div>
                        <span className="block text-lg font-bold text-gray-900">{step.stats.openRate}</span>
                        <span className="text-[10px] uppercase text-gray-400">Open Rate</span>
                      </div>
                      <div>
                        <span className="block text-lg font-bold text-gray-900">{step.stats.clickRate}</span>
                        <span className="text-[10px] uppercase text-gray-400">Click Rate</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {index < steps.length - 1 && (
                   <div className="flex justify-center my-2">
                     <ArrowRight className="w-4 h-4 text-gray-300 rotate-90" />
                   </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Status */}
      <div className="space-y-6">
        <Card className="bg-primary text-white border-none">
          <CardHeader>
            <CardTitle className="text-lg font-serif">Integration Status</CardTitle>
            <CardDescription className="text-white/70">Connected Lead Sources</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white/10 rounded-md">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-medium">LoopNet API</span>
              </div>
              <Badge variant="outline" className="text-white border-white/20">Active</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/10 rounded-md">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-medium">Crexi Feed</span>
              </div>
              <Badge variant="outline" className="text-white border-white/20">Active</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/10 rounded-md">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                <span className="font-medium">Direct Website</span>
              </div>
              <Badge variant="outline" className="text-white border-white/20">Checking</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
              Campaign Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               <div>
                 <div className="flex justify-between text-sm mb-1">
                   <span>Email Open Rate</span>
                   <span className="font-bold">58%</span>
                 </div>
                 <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                   <div className="h-full bg-accent w-[58%]" />
                 </div>
               </div>
               <div>
                 <div className="flex justify-between text-sm mb-1">
                   <span>Response Rate</span>
                   <span className="font-bold">24%</span>
                 </div>
                 <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                   <div className="h-full bg-primary w-[24%]" />
                 </div>
               </div>
               <div>
                 <div className="flex justify-between text-sm mb-1">
                   <span>Scheduled Viewings</span>
                   <span className="font-bold">12</span>
                 </div>
                 <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                   <div className="h-full bg-green-500 w-[12%]" />
                 </div>
               </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
