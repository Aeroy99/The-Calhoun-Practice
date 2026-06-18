import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

import { Logo } from "@/components/ui/Logo";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#') && location.pathname === '/') {
      e.preventDefault();
      const id = href.replace('/#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', href);
      }
      setIsMobileMenuOpen(false);
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header 
      className={cn(
        "header fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-[var(--siteBackgroundColor)] shadow-sm py-2" : "bg-transparent py-4 md:py-6"
      )}
      data-section-id="header"
    >
      <div className="header-inner container mx-auto px-[4vw] flex items-center justify-between h-auto min-h-[50px]">
        
        {/* Logo */}
        <div className="header-title flex-shrink-0 z-50">
          <Link to="/" className="header-title-logo flex items-center gap-3 text-[var(--navigationLinkColor)]" onClick={() => {
            if (location.pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            setIsMobileMenuOpen(false);
          }}>
            <Logo 
              className="h-10 md:h-12 w-auto object-contain hidden md:block" 
              variant="full" 
            />
            <Logo 
              className="h-10 w-auto object-contain md:hidden" 
              variant="monogram" 
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="header-display-desktop hidden lg:flex items-center gap-12">
          <nav className="header-nav" aria-label="Main navigation">
            <div className="header-nav-list flex items-center gap-8">
              {
                [
                  { name: 'Work', href: '/#intro' },
                  { name: 'Services', href: '/#services' },
                  { name: 'About', href: '/#therapists' },
                ].map((item) => (
                <div key={item.name} className="header-nav-item">
                  <Link 
                    to={item.href} 
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="header-nav-folder-title-text text-[var(--navigationLinkColor)] text-[15px] font-medium hover:opacity-60 transition-opacity tracking-wide"
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>
          </nav>

          <div className="header-actions header-actions--right">
            <Link 
              to="/contact" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="header-actions-action header-actions-action--cta btn inline-flex items-center justify-center bg-[hsl(var(--terracotta-main))] text-white px-7 py-3 rounded-full font-medium hover:bg-[hsl(var(--terracotta-dark))] transition-all duration-300 shadow-sm hover:shadow-md uppercase tracking-wider text-[13px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--terracotta-main))] focus-visible:ring-offset-2"
            >
              Let's Talk
            </Link>
          </div>
        </div>

        {/* Mobile Burger */}
        <div className="header-display-mobile lg:hidden flex items-center z-50">
           <button 
            className="header-burger flex items-center justify-center w-10 h-10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <div className="burger-box relative">
              {isMobileMenuOpen ? (
                <X className="w-8 h-8 text-[var(--navigationLinkColor)]" />
              ) : (
                <Menu className="w-8 h-8 text-[var(--navigationLinkColor)]" />
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="header-menu header-menu--folder-list fixed inset-0 bg-[var(--siteBackgroundColor)] z-40 flex flex-col pt-32 px-[6vw]"
          >
            <div className="header-menu-nav mb-auto">
              <nav className="header-menu-nav-list flex flex-col gap-6 text-left" aria-label="Mobile navigation">
                {
                  [
                    { name: 'Work', href: '/#intro' },
                    { name: 'Services', href: '/#services' },
                    { name: 'About', href: '/#therapists' },
                  ].map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + (i * 0.05), duration: 0.4 }}
                  >
                    <Link 
                      to={item.href} 
                      className="header-menu-nav-item text-4xl md:text-5xl font-light text-[var(--navigationLinkColor)] hover:opacity-70 transition-opacity block"
                      onClick={(e) => handleLinkClick(e, item.href)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="header-menu-cta pb-12"
            >
               <Link 
                to="/contact" 
                className="btn inline-flex items-center justify-center w-full bg-[hsl(var(--terracotta-main))] text-white px-10 py-4 rounded-full font-medium hover:bg-[hsl(var(--terracotta-dark))] transition-all duration-300 shadow-sm hover:shadow-md uppercase tracking-wider text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--terracotta-main))] focus-visible:ring-offset-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Let's Talk
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
