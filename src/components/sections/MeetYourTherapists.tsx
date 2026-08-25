import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useCmsHomeContent } from "@/hooks/useCmsHomeContent";
import { usePayloadPage } from "@/hooks/useSiteChrome";
import { DEFAULT_ABOUT, mapAbout } from "@/lib/cms/siteContent";

export function MeetYourTherapists() {
  const { content } = useCmsHomeContent();
  const about = usePayloadPage("about-page", mapAbout, DEFAULT_ABOUT);
  const initials = about.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <section
      className="page-section user-items-list-section full-bleed-section bg-[hsl(var(--cream))] py-[15vh]"
      data-section-id="therapists"
      id="therapists"
    >
      <div className="content-wrapper w-full px-[6vw] max-w-[1400px] mx-auto">
        <div className="list-section-title text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[var(--color-text-primary)] text-3xl md:text-4xl lg:text-[3rem] font-serif tracking-tight"
          >
            {content.therapistHeading}
          </motion.h2>
        </div>

        <div className="user-items-list-simple flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="list-item flex flex-col items-center text-center w-full max-w-lg bg-white rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mx-auto"
          >
            <div
              className="list-image mb-8 w-[240px] h-[240px] rounded-full overflow-hidden shadow-sm relative group mx-auto"
              role="img"
              aria-label={`Professional headshot of ${about.name}, ${about.role} at The Calhoun Practice`}
            >
              {about.photo ? (
                <img src={about.photo} alt={about.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-[hsl(var(--accent))] flex items-center justify-center">
                  <span className="text-6xl font-light tracking-normal text-white">
                    {initials}
                  </span>
                </div>
              )}
            </div>
            <div className="list-item-content px-4 text-center w-full">
              <h3 className="list-item-content__title text-[var(--color-text-primary)] text-2xl font-serif mb-2">
                {about.name}
              </h3>
              <p className="list-item-content__description text-[hsl(var(--terracotta-main))] opacity-90 mb-6 text-sm uppercase tracking-widest font-medium">
                {about.role}
              </p>
              <p className="text-[var(--color-text-primary)] opacity-80 mb-8 text-base leading-relaxed font-light">
                {about.intro}
              </p>
              <Link
                to="/about"
                className="inline-block text-[hsl(var(--terracotta-main))] font-medium hover:text-[hsl(var(--terracotta-dark))] transition-colors border-b border-[hsl(var(--terracotta-main))] pb-0.5 text-sm uppercase tracking-wider"
              >
                Read more on About Me
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
