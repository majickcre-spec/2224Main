import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROPERTY_DATA } from "@/lib/constants";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ZoomIn } from "lucide-react";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"residence" | "office">("residence");

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#office") {
        setActiveTab("office");
      } else if (window.location.hash === "#residence") {
        setActiveTab("residence");
      }
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const images = activeTab === "residence" 
    ? PROPERTY_DATA.images.interior_res 
    : PROPERTY_DATA.images.interior_off;

  return (
    <section id="residence" className="py-24 bg-secondary/30">
      <span id="office" className="absolute -mt-24" />
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-accent text-xs font-bold tracking-widest uppercase mb-3 block">
            Visual Journey
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-primary mb-8">
            Explore the Spaces
          </h2>
          
          <div className="flex justify-center gap-8 border-b border-border max-w-md mx-auto">
            <button
              onClick={() => setActiveTab("residence")}
              className={`pb-4 text-sm uppercase tracking-widest transition-colors relative ${
                activeTab === "residence" ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              The Residence
              {activeTab === "residence" && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("office")}
              className={`pb-4 text-sm uppercase tracking-widest transition-colors relative ${
                activeTab === "office" ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              The Office
              {activeTab === "office" && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
              )}
            </button>
          </div>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {images.map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-[4/3] overflow-hidden cursor-pointer rounded-sm shadow-sm hover:shadow-lg transition-shadow"
              onClick={() => setSelectedImage(src)}
            >
              <img
                src={src}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-white/90 p-3 rounded-full backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <ZoomIn className="w-5 h-5 text-primary" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl bg-transparent border-none p-0 shadow-none">
          <div className="relative w-full h-full flex items-center justify-center">
             {selectedImage && (
               <img
                 src={selectedImage}
                 alt="Full size"
                 className="max-h-[85vh] max-w-full rounded-sm shadow-2xl"
               />
             )}
             <button 
               onClick={() => setSelectedImage(null)}
               className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-md transition-colors"
             >
               <X className="w-6 h-6" />
             </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
