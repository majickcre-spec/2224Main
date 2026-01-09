import { motion } from "framer-motion";
import { Building2, TrendingUp, Store, Home, DollarSign, ArrowRight } from "lucide-react";
import { PROPERTY_DATA } from "@/lib/constants";

export default function ValueSection() {
  return (
    <section id="value" className="py-24 bg-primary text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block py-1 px-3 border border-white/30 bg-white/10 text-xs font-sans tracking-[0.2em] uppercase mb-6 rounded-sm">
            Investment Opportunity
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-6">
            The Value Story
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            A rare mixed-use asset with multiple paths to value creation in one of California's most desirable coastal markets.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center">
                <Building2 className="w-7 h-7 text-accent" />
              </div>
              <div>
                <h3 className="font-serif text-2xl">Current Configuration</h3>
                <p className="text-white/60 text-sm">Live/Work Mixed-Use</p>
              </div>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Home className="w-5 h-5 text-accent mt-1 shrink-0" />
                <div>
                  <span className="font-medium">Luxury Residence (Floors 2-3)</span>
                  <p className="text-white/60 text-sm">4,310 SF of high-end living with 360° views, private elevator, rooftop deck</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-accent mt-1 shrink-0" />
                <div>
                  <span className="font-medium">Professional Office (Ground Floor)</span>
                  <p className="text-white/60 text-sm">2,936 SF fully equipped office space with private entrance</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-accent mt-1 shrink-0" />
                <div>
                  <span className="font-medium">Garage & Workshop</span>
                  <p className="text-white/60 text-sm">4,840 SF subterranean space with 9 parking spaces</p>
                </div>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-accent/10 border border-accent/30 rounded-2xl p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center">
                <Store className="w-7 h-7 text-accent" />
              </div>
              <div>
                <h3 className="font-serif text-2xl">Retail Conversion Potential</h3>
                <p className="text-accent text-sm font-medium">Value-Add Opportunity</p>
              </div>
            </div>
            <p className="text-white/80 mb-6">
              The ground-floor office is ideally positioned for conversion to high-value Main Street retail, 
              capitalizing on Santa Monica's premier commercial corridor and strong foot traffic.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <ArrowRight className="w-4 h-4 text-accent shrink-0" />
                <span className="text-white/80">SM-MU zoning supports retail use</span>
              </li>
              <li className="flex items-center gap-3">
                <ArrowRight className="w-4 h-4 text-accent shrink-0" />
                <span className="text-white/80">Prime Main Street frontage</span>
              </li>
              <li className="flex items-center gap-3">
                <ArrowRight className="w-4 h-4 text-accent shrink-0" />
                <span className="text-white/80">Strong tenant demand in area</span>
              </li>
              <li className="flex items-center gap-3">
                <ArrowRight className="w-4 h-4 text-accent shrink-0" />
                <span className="text-white/80">Potential for NNN lease income</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/5 border border-white/20 rounded-2xl p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center">
                <Home className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-serif text-2xl">Luxury Duplex Conversion</h3>
                <p className="text-white/60 text-sm">100% Residential Option</p>
              </div>
            </div>
            <p className="text-white/80 mb-6">
              Convert the ground-floor office into a premium rental unit, transforming the property into an 
              income-generating luxury duplex in one of LA's most sought-after coastal neighborhoods.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <ArrowRight className="w-4 h-4 text-white/60 shrink-0" />
                <span className="text-white/80">2,936 SF lower unit potential</span>
              </li>
              <li className="flex items-center gap-3">
                <ArrowRight className="w-4 h-4 text-white/60 shrink-0" />
                <span className="text-white/80">Strong Santa Monica rental market</span>
              </li>
              <li className="flex items-center gap-3">
                <ArrowRight className="w-4 h-4 text-white/60 shrink-0" />
                <span className="text-white/80">Owner-occupy upper + rent lower</span>
              </li>
              <li className="flex items-center gap-3">
                <ArrowRight className="w-4 h-4 text-white/60 shrink-0" />
                <span className="text-white/80">Premium coastal rental income</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-r from-accent to-accent/80 rounded-2xl p-8 md:p-12 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <DollarSign className="w-8 h-8" />
            <span className="font-serif text-4xl md:text-5xl font-light">{PROPERTY_DATA.price}</span>
          </div>
          <p className="text-white/90 text-lg mb-6">
            Offered at <span className="font-medium">$862/SF</span> — Exceptional value for a trophy coastal asset with development optionality
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <div className="text-center">
              <span className="block text-2xl font-serif">12,086</span>
              <span className="text-white/70 uppercase tracking-wide text-xs">Total SF</span>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-serif">5,196</span>
              <span className="text-white/70 uppercase tracking-wide text-xs">Lot SF</span>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-serif">4,102</span>
              <span className="text-white/70 uppercase tracking-wide text-xs">Deck SF</span>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-serif">9</span>
              <span className="text-white/70 uppercase tracking-wide text-xs">Parking Spaces</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
