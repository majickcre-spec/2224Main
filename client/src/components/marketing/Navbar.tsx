import { useState, useEffect } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, Lock, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import CADialog from "./CADialog";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCAOpen, setIsCAOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "The Residence", href: "#residence" },
    { name: "The Office", href: "#office" },
    { name: "Virtual Tour", href: "#tour" },
    { name: "Location", href: "#location" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
          isScrolled
            ? "bg-background/80 backdrop-blur-md border-border/40 py-4"
            : "bg-transparent py-6 text-white"
        )}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className={cn("text-2xl font-serif font-bold tracking-widest uppercase transition-colors", isScrolled ? "text-primary" : "text-white")}>
            2224 Main St
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium tracking-wide uppercase hover:text-accent transition-colors",
                  isScrolled ? "text-foreground" : "text-white/90"
                )}
              >
                {link.name}
              </a>
            ))}
            
            <Button 
              variant="outline"
              onClick={() => setIsCAOpen(true)}
              className={cn(
                "font-serif tracking-wide rounded-none border-accent text-accent hover:bg-accent hover:text-white",
                !isScrolled && "bg-black/20 border-white/40 text-white hover:bg-white hover:text-primary"
              )}
            >
              <Lock className="w-3 h-3 mr-2" />
              Broker/Investor Portal
            </Button>
            <Link href="/login">
              <Button 
                variant="ghost"
                size="icon"
                className={cn(
                  "rounded-none",
                  isScrolled ? "text-muted-foreground hover:text-primary" : "text-white/70 hover:text-white"
                )}
              >
                <Settings className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={isScrolled ? "text-foreground" : "text-white"} />
            ) : (
              <Menu className={isScrolled ? "text-foreground" : "text-white"} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border p-6 flex flex-col gap-4 animate-in slide-in-from-top-5 shadow-2xl">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-lg font-serif text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Button 
              className="w-full font-serif rounded-none mt-4 bg-primary text-white"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsCAOpen(true);
              }}
            >
              <Lock className="w-4 h-4 mr-2" />
              Broker/Investor Portal
            </Button>
            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
              <Button 
                variant="outline"
                className="w-full font-serif rounded-none mt-2"
              >
                <Settings className="w-4 h-4 mr-2" />
                Admin Portal
              </Button>
            </Link>
          </div>
        )}
      </nav>

      <CADialog open={isCAOpen} onOpenChange={setIsCAOpen} />
    </>
  );
}
