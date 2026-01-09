import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { PROPERTY_DATA } from "@/lib/constants";

// Import video when available - for now we'll use a placeholder path
// To add your drone footage, upload it and update this import
const droneVideo = "/drone-footage.mp4";

export default function Hero() {
  const [showVideo, setShowVideo] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Switch from video to property images after 6 seconds
    const timer = setTimeout(() => {
      setShowVideo(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  const handleVideoError = () => {
    // If video fails to load, immediately show property images
    setShowVideo(false);
  };

  return (
    <section className="relative h-screen min-h-[800px] w-full overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          {showVideo ? (
            <motion.div
              key="video"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0"
            >
              <video
                ref={videoRef}
                src={droneVideo}
                autoPlay
                muted
                playsInline
                onLoadedData={handleVideoLoad}
                onError={handleVideoError}
                className="w-full h-full object-cover"
              />
              {/* Fallback image while video loads */}
              {!videoLoaded && (
                <img
                  src={PROPERTY_DATA.images.exterior[0]}
                  alt="2224 Main St Exterior"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
            </motion.div>
          ) : (
            <motion.img
              key="image"
              src={PROPERTY_DATA.images.exterior[0]}
              alt="2224 Main St Exterior"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="w-full h-full object-cover"
            />
          )}
        </AnimatePresence>
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block py-1 px-3 border border-white/30 bg-white/10 backdrop-blur-sm text-xs font-sans tracking-[0.2em] uppercase mb-6 rounded-sm">
            Santa Monica, CA
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6 leading-[1.1]"
        >
          Live/Work
          <br />
          <span className="italic font-normal">Masterpiece</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-sans text-lg md:text-xl font-light text-white/90 max-w-2xl mb-12 leading-relaxed"
        >
          {PROPERTY_DATA.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col md:flex-row gap-6 md:gap-16 border-t border-white/20 pt-6 pb-16 md:pb-0"
        >
          <div>
            <span className="block text-3xl font-serif">12,086</span>
            <span className="text-sm uppercase tracking-wide text-white font-medium">SF Building</span>
          </div>
          <div>
            <span className="block text-3xl font-serif">4,102</span>
            <span className="text-sm uppercase tracking-wide text-white font-medium">SF Rooftop Deck</span>
          </div>
          <div>
            <span className="block text-3xl font-serif">5,196</span>
            <span className="text-sm uppercase tracking-wide text-white font-medium">SF Lot</span>
          </div>
          <div>
            <span className="block text-3xl font-serif">360°</span>
            <span className="text-sm uppercase tracking-wide text-white font-medium">Views</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Hidden on mobile to prevent overlap */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <a href="#story" className="flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors group">
          <span className="text-[10px] uppercase tracking-widest">Explore</span>
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
