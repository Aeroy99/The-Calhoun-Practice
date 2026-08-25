import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useCmsHomeContent } from "@/hooks/useCmsHomeContent";

export function PracticeManager() {
  const { content } = useCmsHomeContent();
  const section = content.practiceManager;

  return (
    <section
      className="page-section practice-manager-section full-bleed-section bg-[var(--siteBackgroundColor)] py-[var(--spacing-section)]"
      data-section-id="practice-manager"
    >
      <div className="content-wrapper w-full px-[4vw] max-w-[1000px] mx-auto text-center">
        <div className="flex flex-col items-center justify-center gap-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[var(--color-text-primary)] text-3xl md:text-4xl lg:text-[2.5rem] font-serif tracking-tight max-w-3xl"
          >
            {section.heading}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mt-8 mb-8"
          >
            <div className="w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-full overflow-hidden shadow-md mx-auto relative z-10">
              <div
                className="w-full h-full bg-[hsl(var(--accent))] flex items-center justify-center"
                role="img"
                aria-label="Portrait of Melanie Calhoun, Practice Founder"
              >
                <span className="text-6xl font-light tracking-widest text-white">MC</span>
              </div>
            </div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 z-20 bg-[var(--siteBackgroundColor)] px-6 py-2 rounded-full shadow-sm border border-[hsl(var(--light-gray))]">
              <span className="text-[hsl(var(--terracotta-main))] uppercase tracking-widest text-xs font-semibold">
                {section.badge}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-[var(--color-text-primary)] text-lg leading-relaxed opacity-90">
              {section.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-8"
          >
            <Link
              to="/contact"
              className="inline-flex items-center justify-center bg-[hsl(var(--terracotta-main))] text-white font-medium px-8 py-4 rounded-full transition-all duration-300 hover:bg-[hsl(var(--terracotta-dark))] shadow-[0_4px_14px_0_rgba(198,123,92,0.39)] uppercase tracking-wider text-sm"
            >
              {section.buttonLabel}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
