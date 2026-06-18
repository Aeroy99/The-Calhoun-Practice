import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function MeetYourTherapists() {
  const therapists = [
    {
      name: "Melanie Calhoun",
      specialty: "Founder & CEO, LMFT",
      bio: "Welcome to a safe, confidential space where you can explore your thoughts and feelings without judgment. My approach to therapy is warm, collaborative, and tailored to your unique needs. I specialize in working with individuals and couples navigating life transitions, relationship challenges, and personal growth. By integrating evidence-based practices with deep empathy, we will work together to uncover patterns, heal past wounds, and build a more fulfilling future. Whether you are seeking premarital counseling, couples therapy, or individual support, I am here to guide you toward meaningful change.",
      image: "MC", // initials for placeholder
    }
  ];

  return (
    <section 
      className="page-section user-items-list-section full-bleed-section bg-[hsl(var(--cream))] py-[15vh]"
      data-section-id="therapists"
      id="therapists"
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
            Meet your therapist
          </motion.h2>
        </div>

        {/* Grid - Centered for single therapist */}
        <div className="user-items-list-simple flex justify-center">
          {therapists.map((therapist, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="list-item flex flex-col items-center text-center w-full max-w-lg bg-white rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mx-auto"
            >
              {/* Image Placeholder */}
              <div 
                className="list-image mb-8 w-[240px] h-[240px] rounded-full overflow-hidden shadow-sm relative group mx-auto"
                role="img"
                aria-label={`Professional headshot of ${therapist.name}, ${therapist.specialty} at The Calhoun Practice`}
              >
                <div className="w-full h-full bg-[hsl(var(--accent))] flex items-center justify-center text-[hsl(var(--terracotta-main))] group-hover:bg-[hsl(var(--terracotta-light))] transition-colors duration-500">
                    <span className="text-6xl font-light tracking-normal text-white">
                      {therapist.image}
                    </span>
                 </div>
              </div>
              
              {/* Content */}
              <div className="list-item-content px-4 text-center w-full">
                <h3 className="list-item-content__title text-[var(--color-text-primary)] text-2xl font-serif mb-2">
                  {therapist.name}
                </h3>
                <p className="list-item-content__description text-[hsl(var(--terracotta-main))] opacity-90 mb-6 text-sm uppercase tracking-widest font-medium">
                  {therapist.specialty}
                </p>
                <p className="text-[var(--color-text-primary)] opacity-80 mb-8 text-base leading-relaxed font-light">
                  {therapist.bio}
                </p>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="inline-block text-[hsl(var(--terracotta-main))] font-medium hover:text-[hsl(var(--terracotta-dark))] transition-colors border-b border-[hsl(var(--terracotta-main))] hover:border-[hsl(var(--terracotta-dark))] pb-0.5 text-sm uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--terracotta-main))] focus-visible:ring-offset-2">
                      Learn more about {therapist.name}
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px] bg-[hsl(var(--cream))] border-[hsl(var(--light-gray))]">
                    <DialogHeader>
                      <DialogTitle className="text-2xl text-[var(--color-text-primary)] font-serif">{therapist.name}</DialogTitle>
                      <DialogDescription className="text-sm uppercase tracking-widest text-[hsl(var(--terracotta-main))]">
                        {therapist.specialty}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-6">
                      <p className="text-[var(--color-text-primary)] opacity-80 leading-relaxed text-sm font-light">
                        [Full bio to be added later]
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
