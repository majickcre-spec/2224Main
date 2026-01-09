import { motion } from "framer-motion";
import { PROPERTY_DATA } from "@/lib/constants";
import { MapPin, TrendingUp, Users, Wallet, Footprints } from "lucide-react";

export default function LocationSection() {
  const highlights = [
    { title: "Walk Score", value: "96", description: "Walker's Paradise - Daily errands do not require a car.", icon: Footprints },
    { title: "Avg Income", value: "$143k", description: "Average household income within a 3-mile radius.", icon: Wallet },
    { title: "Population", value: "182k", description: "Total population within a 3-mile radius.", icon: Users },
    { title: "Appreciation", value: "+4.2%", description: "Projected annual property value growth in Santa Monica.", icon: TrendingUp },
  ];

  return (
    <section id="location" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-accent text-xs font-bold tracking-widest uppercase mb-3 block">
            The Neighborhood
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-primary mb-6">
            Heart of Santa Monica
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Situated on the iconic Main Street, 2224 offers the perfect blend of coastal relaxation and urban sophistication. Just steps from the sand, yet surrounded by world-class dining and retail.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-sm shadow-sm border border-border text-center hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-serif font-bold text-primary mb-2">{item.value}</h3>
              <p className="text-sm font-bold uppercase tracking-wider text-accent mb-2">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Interactive Map */}
        <div className="relative h-[500px] w-full rounded-sm overflow-hidden mb-24 border border-border">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3308.8961842855!2d-118.49246692358083!3d33.98756377318371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2ba9d5b9b6a1d%3A0x1234567890abcdef!2s2224%20Main%20St%2C%20Santa%20Monica%2C%20CA%2090405!5e0!3m2!1sen!2sus!4v1704067200000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="2224 Main Street Location"
            className="grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>

        {/* Future Potential / Predictive Analysis */}
        <div className="bg-primary text-white p-8 md:p-16 rounded-sm relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('/attached_assets/background__1767287926767.png')] opacity-10 mix-blend-overlay"></div>
           <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
             <div>
               <span className="text-accent text-xs font-bold tracking-widest uppercase mb-3 block">
                  Future Outlook
                </span>
               <h3 className="font-serif text-3xl md:text-4xl mb-6">Silicon Beach Expansion</h3>
               <div className="space-y-4 text-white/80 leading-relaxed">
                 <p>
                   As "Silicon Beach" continues to mature, the demand for high-quality live/work spaces in Santa Monica is projected to outpace supply through 2030.
                 </p>
                 <p>
                   The Main Street corridor is experiencing a renaissance of boutique retail and fine dining, further cementing its status as a premier pedestrian destination.
                 </p>
               </div>
             </div>
             
             {/* Chart/Graph Visual Mockup */}
             <div className="bg-white/5 p-8 rounded-sm border border-white/10 backdrop-blur-sm">
                <div className="flex justify-between items-end h-48 gap-4">
                  <div className="w-full bg-accent/30 h-[40%] rounded-t-sm relative group">
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-white/60">2023</span>
                  </div>
                  <div className="w-full bg-accent/50 h-[55%] rounded-t-sm relative group">
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-white/60">2024</span>
                  </div>
                  <div className="w-full bg-accent/70 h-[70%] rounded-t-sm relative group">
                     <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-white/60">2025</span>
                  </div>
                  <div className="w-full bg-accent h-[90%] rounded-t-sm relative group">
                    <div className="absolute top-2 right-2 text-xs font-bold text-white">+12%</div>
                     <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-white/60">2026</span>
                  </div>
                </div>
                <p className="text-center text-xs uppercase tracking-widest mt-6 text-white/60">projected commercial rent growth</p>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
}
