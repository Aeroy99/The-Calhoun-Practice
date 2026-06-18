import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

export function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  useEffect(() => {
    // Check if user has already seen or closed the popup
    const hasSeenPopup = localStorage.getItem("newsletter_popup_seen");
    
    if (!hasSeenPopup) {
      // Show popup after 5 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("newsletter_popup_seen", "true");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("submitting");
    
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      // Close automatically after success
      setTimeout(() => {
        handleClose();
      }, 3000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-[100] backdrop-blur-sm"
            onClick={handleClose}
          />
          
          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] z-[101] px-4"
          >
            <div className="bg-[var(--siteBackgroundColor)] shadow-2xl rounded-sm overflow-hidden relative">
              
              {/* Close Button */}
              <button 
                onClick={handleClose}
                className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-800 transition-colors z-10"
                aria-label="Close popup"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="p-8 md:p-12 text-center">
                <h3 className="text-2xl md:text-3xl font-medium text-[var(--color-text-primary)] mb-4 tracking-tight">
                  Join our newsletter
                </h3>
                <p className="text-[var(--color-text-primary)] opacity-80 mb-8 leading-relaxed font-light">
                  Receive insights, resources, and updates directly to your inbox. We send thoughtful content designed to support your relational health.
                </p>
                
                {status === "success" ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-green-600 font-medium py-4"
                  >
                    Thank you for subscribing!
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
                    <div>
                      <label htmlFor="newsletter-email" className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
                        Email Address
                      </label>
                      <input 
                        id="newsletter-email"
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jane@example.com"
                        required
                        className="w-full px-4 py-3 bg-[#f5f5f5] border-none rounded-none focus:outline-none focus:ring-1 focus:ring-neutral-400"
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full bg-[var(--primaryButtonBackgroundColor)] text-white font-medium py-4 uppercase tracking-widest text-sm hover:bg-[var(--darkAccent-hsl)] transition-colors disabled:opacity-70"
                    >
                      {status === "submitting" ? "Subscribing..." : "Subscribe"}
                    </button>
                  </form>
                )}
                
                <p className="text-xs text-neutral-400 mt-6 mt-4">
                  We respect your privacy. Read our <Link to="/privacy-policy" className="underline hover:text-neutral-600">Privacy Policy</Link>. Unsubscribe at any time.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
