import Navbar from "@/components/marketing/Navbar";
import Hero from "@/components/marketing/Hero";
import StorySection from "@/components/marketing/StorySection";
import ValueSection from "@/components/marketing/ValueSection";
import Gallery from "@/components/marketing/Gallery";
import VirtualTour from "@/components/marketing/VirtualTour";
import LocationSection from "@/components/marketing/LocationSection";
import ContactSection from "@/components/marketing/ContactSection";
import ChatWidget from "@/components/marketing/ChatWidget";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-accent selection:text-white">
      <Navbar />
      <Hero />
      <StorySection />
      <ValueSection />
      <Gallery />
      <VirtualTour />
      <LocationSection />
      <ContactSection />
      
      {/* Footer */}
      <footer className="bg-primary text-white/60 py-12 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p className="font-serif text-2xl text-white mb-4">2224 Main Street</p>
          <div className="flex justify-center gap-6 text-sm uppercase tracking-widest mb-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
          <p className="text-xs">
            © {new Date().getFullYear()} 2224 Main Street. All rights reserved. 
            <br />
            Marketing by Replit Design.
          </p>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
}
