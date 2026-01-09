import { motion } from "framer-motion";
import { PROPERTY_DATA } from "@/lib/constants";

export default function StorySection() {
  return (
    <section id="story" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Texture Background */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: `url(${PROPERTY_DATA.images.background})`, backgroundSize: 'cover' }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent text-sm font-bold tracking-widest uppercase mb-4 block">
              The Vision
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary mb-8 leading-tight">
              A Sanctuary <br />
              <span className="italic text-foreground/80">Above it All</span>
            </h2>
            <div className="space-y-6 text-muted-foreground font-sans leading-relaxed text-lg">
              <p>
                Imagine a life where your commute is a private elevator ride. 
                2224 Main Street offers a rare synthesis of professional ambition and 
                personal tranquility.
              </p>
              <p>
                The residence floats above the city, a secluded haven with soaring ceilings 
                and artistic design elements. Below, a fully equipped office space serves 
                as the ideal headquarters for your creative enterprise.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {PROPERTY_DATA.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 shrink-0" />
                    <span className="text-sm md:text-base text-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Image Composition */}
          <div className="relative h-[600px]">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="absolute top-0 right-0 w-3/4 h-3/4 z-10 shadow-2xl"
            >
              <img
                src={PROPERTY_DATA.images.interior_res[0]}
                alt="Living Room"
                className="w-full h-full object-cover rounded-sm"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute bottom-0 left-0 w-2/3 h-2/3 z-0 shadow-xl"
            >
              <img
                src={PROPERTY_DATA.images.interior_res[4]} // Using a roof deck image or another interior
                alt="Detail"
                className="w-full h-full object-cover rounded-sm filter brightness-75"
              />
            </motion.div>
            
            {/* Decorative Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-accent/30 rounded-full z-20 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
