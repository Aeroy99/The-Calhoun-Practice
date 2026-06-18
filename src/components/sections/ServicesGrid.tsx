import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ServicesGrid() {
  const services = [
    {
      title: "Couples Therapy",
      description: "Strengthen your connection, improve communication, and navigate relationship challenges together in a supportive environment.",
      details: "Our couples therapy provides a neutral, safe space to work through conflicts, improve communication patterns, and rebuild intimacy. Whether you're facing a specific crisis or just want to strengthen your bond, we use evidence-based approaches to help you and your partner understand each other's needs and create a more fulfilling relationship.",
      image: "/images/services/couples-therapy.jpg",
      link: "/contact"
    },
    {
      title: "Individual Healing",
      description: "Explore personal patterns, process emotions, and find your path to healing and self-discovery with compassionate guidance.",
      details: "Individual therapy is a collaborative journey toward self-discovery and healing. We provide a supportive, non-judgmental environment to help you process difficult emotions, overcome past trauma, manage anxiety and depression, and break unhelpful patterns. Our goal is to empower you to live a more authentic, balanced life.",
      image: "/images/services/individual-healing.jpg",
      link: "/contact"
    },
    {
      title: "Premarital Counseling",
      description: "Build a strong foundation for your marriage by discussing important topics and developing tools for a lifetime of partnership.",
      details: "Set your marriage up for success with our premarital counseling program. We guide you through important conversations about values, finances, family planning, and conflict resolution. By proactively addressing potential areas of friction and building strong communication skills now, you'll create a resilient foundation for your life together.",
      image: "/images/services/premarital-counseling.jpg",
      link: "/contact"
    }
  ];

  return (
    <section 
      className="page-section user-items-list-section full-bleed-section bg-[var(--siteBackgroundColor)] py-[15vh]"
      data-section-id="services"
      id="services"
    >
      <div className="content-wrapper w-full px-[6vw] max-w-[1400px] mx-auto">
        {/* Title */}
        <div className="list-section-title text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[var(--color-text-primary)] text-3xl md:text-4xl lg:text-[3rem] font-serif tracking-tight"
          >
            How we help:
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="user-items-list-simple grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          {services.map((service, index) => (
            <motion.div 
              key={index}
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
                  {service.description}
                </p>
                <div className="list-item-content__button-wrapper mt-auto">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button 
                        className="list-item-content__button inline-block text-[hsl(var(--terracotta-main))] font-medium hover:text-[hsl(var(--terracotta-dark))] transition-colors border-b border-[hsl(var(--terracotta-main))] hover:border-[hsl(var(--terracotta-dark))] pb-0.5 text-sm uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-[hsl(var(--terracotta-light))]"
                        aria-label={`Learn more about ${service.title}`}
                      >
                        Learn More
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] bg-[hsl(var(--cream))] border-[hsl(var(--light-gray))]">
                      <DialogHeader>
                        <DialogTitle className="text-2xl text-[var(--color-text-primary)] font-serif mb-2">{service.title}</DialogTitle>
                        <DialogDescription className="text-[var(--color-text-primary)] opacity-80 leading-relaxed text-base font-light">
                          {service.details}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-6 flex justify-end">
                        <Link 
                          to="/contact" 
                          className="inline-flex items-center justify-center bg-[hsl(var(--terracotta-main))] text-white px-6 py-2 rounded-full font-medium hover:bg-[hsl(var(--terracotta-dark))] transition-all duration-300 shadow-sm uppercase tracking-wider text-xs focus:ring-2 focus:ring-[hsl(var(--terracotta-light))] focus:outline-none"
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

        {/* Bottom CTA */}
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
              Request a Consultation
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
