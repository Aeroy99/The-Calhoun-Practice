import { motion } from "motion/react";
import { ArchitecturalShadow } from "@/components/ArchitecturalShadow";

interface HeroProps {
  badgeLeft: string;
  badgeRight: string;
  heading: string;
  description: string;
}

export function Hero({
  badgeLeft,
  badgeRight,
  heading,
  description,
}: HeroProps) {
  return (
    <section 
      className="page-section full-bleed-section layout-engine-section background-width--full-bleed section-height--small content-width--wide horizontal-alignment--center vertical-alignment--middle has-background has-section-divider section-border relative flex items-center justify-center min-h-[70vh] md:min-h-[85vh] py-[15vh] overflow-hidden"
      data-section-id="hero"
    >
      {/* Background Image & Overlay */}
      <div className="section-background absolute inset-0 z-0">
        <div
          className="section-background-image absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/hero/background.jpg')",
            backgroundPosition: "50% 50%"
          }}
        />
        {/* Architectural Shadow Overlay - evokes calm introspection */}
        <div className="absolute inset-0 opacity-20">
          <ArchitecturalShadow variant="window" className="w-full h-full" />
        </div>
        <div className="section-background-overlay absolute inset-0 bg-[hsl(var(--cream))]/60" />
      </div>

      {/* Content */}
      <div className="content-wrapper relative z-10 w-full px-[6vw]">
        <div className="content flex flex-col items-center justify-center text-center max-w-[1000px] mx-auto gap-8">
          <div className="sqs-block html-block sqs-block-html">
            <div className="sqs-block-content flex flex-col items-center gap-6">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--cream))]/80 backdrop-blur-sm border border-[hsl(var(--terracotta-main))]/20 text-[hsl(var(--warm-gray))] text-sm font-medium tracking-wide uppercase shadow-sm"
              >
                <span>{badgeLeft}</span>
                <span className="w-1 h-1 rounded-full bg-[hsl(var(--terracotta-main))]"></span>
                <span>{badgeRight}</span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-[var(--color-text-primary)] text-4xl md:text-5xl lg:text-[4rem] leading-[1.15] font-serif tracking-tight max-w-[900px]"
              >
                {heading}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="text-[var(--color-text-primary)] text-lg md:text-xl max-w-[650px] leading-relaxed font-light mt-2"
              >
                {description}
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* Wavy Divider */}
      <div className="section-divider-display section-divider-block absolute bottom-0 left-0 w-full z-20 pointer-events-none">
        <div className="section-divider-content relative w-full h-[6vw] min-h-[50px] max-h-[120px]">
          <svg 
            className="section-divider-svg-clip w-full h-full block text-[var(--siteBackgroundColor)] fill-current" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0,60 C150,90 300,30 450,60 C600,90 750,30 900,60 C1050,90 1200,30 1350,60 V120 H0 V60 Z" />
          </svg>
        </div>
      </div>
    </section>
  );
}
