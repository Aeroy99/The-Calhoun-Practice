import { motion } from "motion/react";
import { ConsultationForm } from "@/components/ConsultationForm";

interface CtaProps {
  badge: string;
  heading: string;
}

export function Cta({ badge, heading }: CtaProps) {
  return (
    <section 
      className="page-section full-bleed-section layout-engine-section background-width--full-bleed section-height--medium content-width--wide horizontal-alignment--center vertical-alignment--middle fluid-engine bg-[hsl(var(--cream))] relative flex items-center justify-center py-[15vh] overflow-hidden"
      data-section-id="cta"
    >
      <div className="content-wrapper relative z-10 w-full px-[6vw]">
        <div className="content flex flex-col items-center justify-center text-center max-w-[900px] mx-auto gap-12">
          
          <div className="sqs-block html-block sqs-block-html">
            <div className="sqs-block-content flex flex-col items-center gap-4">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[hsl(var(--terracotta-main))]/20 text-[hsl(var(--warm-gray))] text-sm font-medium tracking-wide uppercase shadow-sm"
              >
                <span>{badge}</span>
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                className="text-3xl md:text-4xl lg:text-[3rem] leading-[1.2] font-serif tracking-tight text-[var(--color-text-primary)]"
              >
                {heading}
              </motion.h2>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="w-full"
          >
            <ConsultationForm />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
