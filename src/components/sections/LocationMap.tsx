import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export function LocationMap() {
  return (
    <section 
      className="page-section location-section full-bleed-section layout-engine-section background-width--full-bleed section-height--medium content-width--wide horizontal-alignment--center vertical-alignment--middle bg-[var(--siteBackgroundColor)] py-[var(--spacing-section)]"
      data-section-id="location"
    >
      <div className="content-wrapper w-full px-[4vw] max-w-[1200px] mx-auto">
        <div className="flex flex-col items-center justify-center gap-10 md:gap-14 text-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-[var(--color-text-primary)] text-3xl md:text-4xl lg:text-[2.5rem] leading-[1.2] font-medium tracking-tight">
              We offer in-person sessions in Surrey, and online sessions throughout the UK.
            </h2>
          </motion.div>

          {/* Button */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <Link 
              to="/contact"
              className="inline-flex items-center justify-center bg-[hsl(var(--terracotta-main))] text-white font-medium px-8 py-4 rounded-full transition-all duration-300 hover:bg-[hsl(var(--terracotta-dark))] shadow-sm hover:shadow-md uppercase tracking-wider text-sm"
            >
              Request a Consultation
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
