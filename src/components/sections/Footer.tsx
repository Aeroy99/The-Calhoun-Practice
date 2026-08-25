import { Facebook, Instagram } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSiteChrome } from "@/hooks/useSiteChrome";

const TikTok = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const icons = {
  instagram: Instagram,
  facebook: Facebook,
  tiktok: TikTok,
};

export function Footer() {
  const location = useLocation();
  const { chrome } = useSiteChrome();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#") && location.pathname === "/") {
      e.preventDefault();
      const id = href.replace("/#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
      }
    }
  };

  return (
    <footer className="footer section py-[var(--spacing-section)] bg-[var(--siteBackgroundColor)] text-[var(--navigationLinkColor)] text-center">
      <div className="container mx-auto px-[4vw]">
        <div className="flex flex-col items-center justify-center gap-12">
          <nav className="footer-nav" aria-label="Footer navigation">
            <ul className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              {chrome.footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-[15px] font-medium tracking-wide hover:opacity-60 transition-opacity uppercase"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {chrome.socialLinks.length > 0 ? (
            <div className="footer-socials">
              <div className="flex items-center gap-6">
                {chrome.socialLinks.map((social) => {
                  const Icon =
                    icons[social.network as keyof typeof icons] || Instagram;
                  return (
                    <a
                      key={`${social.network}-${social.url}`}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-60 transition-opacity"
                      aria-label={social.network}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          ) : null}

          <div className="footer-copyright text-[13px] opacity-70 mt-4">
            <p>
              &copy; {new Date().getFullYear()} {chrome.copyrightName}. All Rights
              Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
