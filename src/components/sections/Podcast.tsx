import { motion } from "motion/react";
import { Headphones, Mic2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function Podcast() {
  return (
    <section 
      className="page-section full-bleed-section bg-[hsl(var(--cream))] py-[15vh] overflow-hidden relative"
      data-section-id="podcast"
      id="podcast"
    >
      <div className="content-wrapper w-full px-[6vw] max-w-[1200px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center bg-white rounded-3xl p-8 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          {/* Content */}
          <div className="podcast-content order-2 lg:order-1 text-center lg:text-left flex flex-col items-center lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[hsl(var(--cream))] border border-[hsl(var(--terracotta-main))]/20 text-[hsl(var(--warm-gray))] text-sm font-medium tracking-wide uppercase shadow-sm mb-6"
            >
              <span>Podcast</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[var(--color-text-primary)] text-3xl md:text-4xl lg:text-[2.5rem] font-serif tracking-tight mb-6"
            >
              More Than A Check-In
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[var(--color-text-primary)] opacity-80 mb-8 text-lg leading-relaxed font-light max-w-[500px]"
            >
              Join me for candid conversations about relationships, mental health, and the journey to self-discovery. We explore the topics that matter most in building fulfilling connections.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <a 
                href="https://podcasts.apple.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[hsl(var(--terracotta-main))] text-white px-8 py-4 rounded-full font-medium hover:bg-[hsl(var(--terracotta-dark))] transition-all duration-300 shadow-sm hover:shadow-md uppercase tracking-wider text-sm gap-3"
              >
                <Headphones className="w-5 h-5" />
                Listen on Apple Podcasts
              </a>
            </motion.div>
          </div>

          {/* Image/Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="podcast-visual order-1 lg:order-2 flex justify-center"
          >
            <div className="relative w-full max-w-[400px] aspect-square rounded-[2rem] overflow-hidden shadow-sm group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[hsl(var(--terracotta-main))] to-[hsl(var(--terracotta-light))] mix-blend-multiply opacity-20 group-hover:opacity-10 transition-opacity duration-500 z-10" />
              <img 
                src="/images/podcast/cover.jpg" 
                alt="More Than A Check-In Podcast Cover" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  // Fallback for placeholder
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                  target.nextElementSibling?.classList.add('flex');
                }}
              />
              <div className="hidden absolute inset-0 bg-[hsl(var(--terracotta-light))] flex-col items-center justify-center text-[hsl(var(--terracotta-dark))] p-8 text-center">
                <Mic2 className="w-16 h-16 mb-4 opacity-50" />
                <span className="font-serif text-2xl mb-2">More Than A Check-In</span>
                <span className="text-sm uppercase tracking-widest opacity-70">With Melanie Calhoun</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
