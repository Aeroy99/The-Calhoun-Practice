import { SiteWrapper } from "@/components/sections/SiteWrapper";
import { Header } from "@/components/sections/Header";
import { MainContentWrapper } from "@/components/sections/MainContentWrapper";
import { FooterWrapper } from "@/components/sections/FooterWrapper";
import { Footer } from "@/components/sections/Footer";
import { usePayloadPage } from "@/hooks/useSiteChrome";
import { mapSections } from "@/lib/cms/siteContent";

const fallbackSections = [
  {
    heading: "Information We Collect",
    body: "We collect only the information necessary to respond to your inquiry or provide care: name, email address, phone number (if provided), and a brief description of what you are seeking help with.",
  },
  {
    heading: "How We Use Your Information",
    body: "We use your information solely to contact you about therapy services and to match you with the most appropriate therapist. We never sell, share, or use your information for marketing purposes.",
  },
  {
    heading: "Confidentiality",
    body: "All communications and therapy sessions are kept strictly confidential in accordance with professional ethical standards and applicable UK laws.",
  },
  {
    heading: "Data Security",
    body: "We use reasonable technical and organizational measures to protect your information.",
  },
  {
    heading: "Your Rights",
    body: "You may request access to, correction of, or deletion of your personal information at any time by contacting us.",
  },
  {
    heading: "Contact Us",
    body: "If you have questions about this policy, please email or call us using the details in the footer.",
  },
];

const PrivacyPolicyPage = () => {
  const page = usePayloadPage(
    "privacy-page",
    (raw) => {
      const rec = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
      return {
        heading: typeof rec.heading === "string" ? rec.heading : "Privacy Policy",
        lastUpdated: typeof rec.lastUpdated === "string" ? rec.lastUpdated : "June 17, 2026",
        intro:
          typeof rec.intro === "string"
            ? rec.intro
            : "The Calhoun Practice is committed to protecting the privacy and confidentiality of everyone who contacts us or receives services.",
        sections: mapSections(rec.sections, fallbackSections),
        footerNote:
          typeof rec.footerNote === "string"
            ? rec.footerNote
            : "This is a draft. Have a legal professional review it for your specific situation before publishing.",
      };
    },
    {
      heading: "Privacy Policy",
      lastUpdated: "June 17, 2026",
      intro:
        "The Calhoun Practice is committed to protecting the privacy and confidentiality of everyone who contacts us or receives services.",
      sections: fallbackSections,
      footerNote:
        "This is a draft. Have a legal professional review it for your specific situation before publishing.",
    },
  );

  return (
    <SiteWrapper>
      <Header />
      <MainContentWrapper>
        <section className="py-32 md:py-40 bg-[hsl(var(--cream))] min-h-screen">
          <div className="container mx-auto px-6 max-w-3xl bg-white p-10 md:p-16 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h1 className="text-4xl md:text-5xl font-serif text-[hsl(var(--terracotta-main))] mb-8 text-center">
              {page.heading}
            </h1>
            <div className="prose prose-stone max-w-none text-[hsl(var(--warm-gray))] space-y-6 font-light">
              <p className="text-center text-sm mb-12">
                <em>Last updated: {page.lastUpdated}</em>
              </p>
              <p>{page.intro}</p>
              {page.sections.map((section) => (
                <div key={section.heading}>
                  <h2 className="text-2xl font-serif text-[hsl(var(--terracotta-main))] mt-10 mb-4 border-b border-[hsl(var(--terracotta-main))]/20 pb-4">
                    {section.heading}
                  </h2>
                  <p>{section.body}</p>
                </div>
              ))}
              <p className="text-sm text-[hsl(var(--warm-gray))]/70 mt-16 italic border-t border-[hsl(var(--light-gray))] pt-6 text-center">
                {page.footerNote}
              </p>
            </div>
          </div>
        </section>
      </MainContentWrapper>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </SiteWrapper>
  );
};

export default PrivacyPolicyPage;
