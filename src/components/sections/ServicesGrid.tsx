import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCmsHomeContent } from "@/hooks/useCmsHomeContent";
import { useSiteChrome } from "@/hooks/useSiteChrome";

export function ServicesGrid() {
  const { services } = useSiteChrome();
  const { content } = useCmsHomeContent();

  return (
    <section
      className="page-section user-items-list-section full-bleed-section bg-[var(--siteBackgroundColor)] py-[15vh]"
      data-section-id="services"
      id="services"
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
            {content.servicesHeading}
          </motion.h2>
        </div>

        <div className="user-items-list-simple grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="list-item list-item-basic-animation flex flex-col items-center text-center bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 pb-10"
            >
              <div className="list-image mb-8 w-full aspect-[4/3] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="list-item-content max-w-[380px] px-8">
                <h3 className="list-item-content__title text-[var(--color-text-primary)] text-xl md:text-2xl font-serif mb-4">
                  {service.title}
                </h3>
                <p className="list-item-content__description text-[var(--color-text-primary)] opacity-80 mb-8 leading-relaxed font-light">
                  {service.summary}
                </p>
                <div className="list-item-content__button-wrapper mt-auto">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        className="list-item-content__button inline-block text-[hsl(var(--terracotta-main))] font-medium hover:text-[hsl(var(--terracotta-dark))] transition-colors border-b border-[hsl(var(--terracotta-main))] hover:border-[hsl(var(--terracotta-dark))] pb-0.5 text-sm uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-[hsl(var(--terracotta-light))]"
                        aria-label={`Learn more about ${service.title}`}
                      >
                        {service.buttonLabel}
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] bg-[hsl(var(--cream))] border-[hsl(var(--light-gray))]">
                      <DialogHeader>
                        <DialogTitle className="text-2xl text-[var(--color-text-primary)] font-serif mb-2">
                          {service.title}
                        </DialogTitle>
                        <DialogDescription className="text-[var(--color-text-primary)] opacity-80 leading-relaxed text-base font-light">
                          {service.details}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-6 flex justify-end">
                        <Link
                          to="/contact"
                          className="inline-flex items-center justify-center bg-[hsl(var(--terracotta-main))] text-white px-6 py-2 rounded-full font-medium hover:bg-[hsl(var(--terracotta-dark))] transition-all duration-300 shadow-sm uppercase tracking-wider text-xs"
                        >
                          Request a Consultation
                        </Link>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="list-section-button-container text-center mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link
              to="/contact"
              className="list-section-button inline-flex items-center justify-center bg-[hsl(var(--terracotta-main))] text-white px-10 py-4 rounded-full font-medium hover:bg-[hsl(var(--terracotta-dark))] transition-all duration-300 shadow-sm hover:shadow-md uppercase tracking-wider text-sm"
            >
              {content.servicesButtonLabel}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
