import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArchitecturalShadow } from "@/components/ArchitecturalShadow";

interface IntroductionProps {
  heading: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export function Introduction({
  heading,
  description,
  buttonText,
  buttonLink,
}: IntroductionProps) {
  return (
    <section 
      className="page-section full-bleed-section layout-engine-section background-width--full-bleed section-height--medium content-width--wide horizontal-alignment--center vertical-alignment--middle has-background has-section-divider relative flex items-center justify-center min-h-[60vh] py-[15vh] overflow-hidden"
      data-section-id="intro"
      id="intro"
    >
      {/* Background with Architectural Shadow */}
      <div className="section-background absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[hsl(var(--cream))]" />
        {/* Architectural Shadow Pattern - minimal and calming */}
        <div className="absolute inset-0 opacity-20">
          <ArchitecturalShadow variant="minimal" className="w-full h-full" />
        </div>
      </div>

      {/* Content */}
      <div className="content-wrapper relative z-10 w-full px-[6vw]">
        <div className="content flex flex-col items-center justify-center text-center max-w-[900px] mx-auto gap-10">
          
          {/* Headline */}
          <div className="sqs-block html-block sqs-block-html">
            <div className="sqs-block-content">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-[var(--color-text-primary)] text-3xl md:text-4xl lg:text-[3rem] leading-[1.2] font-serif tracking-tight"
              >
                {heading}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-[var(--color-text-primary)] text-lg md:text-xl mt-8 max-w-[700px] mx-auto leading-relaxed font-light"
              >
                {description}
              </motion.p>
            </div>
          </div>

          {/* Button */}
          <div className="sqs-block button-block sqs-block-button">
            <div className="sqs-block-button-container sqs-block-button-container--center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                <Link 
                  to={buttonLink}
                  className="sqs-block-button-element--medium sqs-button-element--primary inline-flex items-center justify-center bg-[hsl(var(--terracotta-main))] text-white font-medium px-8 py-4 rounded-full transition-all duration-300 hover:bg-[hsl(var(--terracotta-dark))] shadow-sm hover:shadow-md uppercase tracking-wider text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--terracotta-main))] focus-visible:ring-offset-2"
                >
                  {buttonText}
                </Link>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
