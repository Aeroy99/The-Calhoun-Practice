import { motion } from "motion/react";

interface TestimonialProps {
  quote: string;
  author: string;
}

export function Testimonial({ quote, author }: TestimonialProps) {
  return (
    <section 
      className="page-section testimonial-section full-bleed-section bg-[var(--siteBackgroundColor)] py-[var(--spacing-section)]"
      data-section-id="testimonial"
    >
      <div className="content-wrapper w-full px-[4vw] max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">
          
          {/* Image Side (Left per .image-position-left) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/2 flex justify-center md:justify-end"
          >
            <div className="relative w-full max-w-[500px] aspect-[4/3] md:aspect-square rounded-[var(--radius-lg)] overflow-hidden shadow-md bg-[#f4f4f4] flex items-center justify-center text-gray-400">
               {/* Placeholder for the "styled image" */}
               <div className="text-center p-8">
                 <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                 </svg>
                 <span className="block text-sm uppercase tracking-widest">Testimonial Image</span>
               </div>
            </div>
          </motion.div>

          {/* Text/Quote Side */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full md:w-1/2 text-center md:text-left"
          >
            <div className="max-w-md mx-auto md:mx-0">
              <svg className="w-10 h-10 text-[var(--color-primary-accent)] mb-6 mx-auto md:mx-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
              </svg>
              
              <blockquote className="text-[var(--color-text-primary)] text-xl md:text-2xl font-light italic leading-relaxed mb-6">
                {quote}
              </blockquote>
              
              <div className="flex items-center justify-center md:justify-start gap-4">
                <div className="text-[var(--color-text-primary)]">
                  <cite className="not-italic font-medium block text-lg uppercase tracking-wider text-[hsl(var(--terracotta-main))]">{author}</cite>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
