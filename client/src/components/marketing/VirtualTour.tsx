import { motion } from "framer-motion";
import { PROPERTY_DATA } from "@/lib/constants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function VirtualTour() {
  return (
    <section id="tour" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/3">
            <span className="text-accent text-xs font-bold tracking-widest uppercase mb-3 block">
              Layout & Flow
            </span>
            <h2 className="font-serif text-4xl text-primary mb-6">
              Floor Plans
            </h2>
            <p className="text-muted-foreground mb-8">
              Explore the thoughtful separation between the public office spaces and the private residence above. Every level is accessible via elevator.
            </p>
            
            <div className="space-y-6">
              <div className="p-6 bg-secondary/30 border border-border rounded-sm">
                <h3 className="font-serif text-xl mb-2 text-primary">Office Level</h3>
                <p className="text-sm text-muted-foreground">
                  Professional reception, conference room, 3 private offices, break room, and utility areas.
                </p>
              </div>
              <div className="p-6 bg-secondary/30 border border-border rounded-sm">
                <h3 className="font-serif text-xl mb-2 text-primary">Residence Main</h3>
                <p className="text-sm text-muted-foreground">
                  Grand living room with soaring ceilings, chef's kitchen, dining area, study, and expansive patios.
                </p>
              </div>
              <div className="p-6 bg-secondary/30 border border-border rounded-sm">
                <h3 className="font-serif text-xl mb-2 text-primary">Residence Upper</h3>
                <p className="text-sm text-muted-foreground">
                  Master suite retreat with private balcony, walk-in closet, and laundry.
                </p>
              </div>
            </div>
          </div>

          <div className="md:w-2/3">
            <Tabs defaultValue="main" className="w-full">
              <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none h-auto p-0 mb-8">
                <TabsTrigger 
                  value="office" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent data-[state=active]:shadow-none py-4 px-6 font-serif text-lg"
                >
                  Office
                </TabsTrigger>
                <TabsTrigger 
                  value="main" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent data-[state=active]:shadow-none py-4 px-6 font-serif text-lg"
                >
                  Main Living
                </TabsTrigger>
                <TabsTrigger 
                  value="upper" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent data-[state=active]:shadow-none py-4 px-6 font-serif text-lg"
                >
                  Upper Suite
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="office" className="mt-0">
                <div className="bg-white p-4 border border-border shadow-sm">
                  <img src={PROPERTY_DATA.images.floorplans[1]} alt="Office Floor Plan" className="w-full h-auto" />
                </div>
              </TabsContent>
              <TabsContent value="main" className="mt-0">
                <div className="bg-white p-4 border border-border shadow-sm">
                  <img src={PROPERTY_DATA.images.floorplans[0]} alt="Main Floor Plan" className="w-full h-auto" />
                </div>
              </TabsContent>
              <TabsContent value="upper" className="mt-0">
                <div className="bg-white p-4 border border-border shadow-sm">
                  <img src={PROPERTY_DATA.images.floorplans[2]} alt="Upper Floor Plan" className="w-full h-auto" />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}
