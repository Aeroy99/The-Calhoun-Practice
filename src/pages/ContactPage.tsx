import { SiteWrapper } from "@/components/sections/SiteWrapper";
import { Header } from "@/components/sections/Header";
import { FooterWrapper } from "@/components/sections/FooterWrapper";
import { Footer } from "@/components/sections/Footer";
import { BodyClosing } from "@/components/sections/BodyClosing";
import { ConsultationForm } from "@/components/ConsultationForm";
import { usePayloadPage } from "@/hooks/useSiteChrome";

const fallback = {
  heading: "Start Here",
  intro:
    "Please complete the form below to request a consultation. We offer a confidential, safe space and look forward to connecting with you.",
};

export function ContactPage() {
  const copy = usePayloadPage(
    "contact-page",
    (raw) => {
      const rec = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
      return {
        heading: typeof rec.heading === "string" ? rec.heading : fallback.heading,
        intro: typeof rec.intro === "string" ? rec.intro : fallback.intro,
      };
    },
    fallback,
  );

  return (
    <SiteWrapper>
      <Header />
      <main id="page" className="site-page font-sans bg-[var(--color-background)] min-h-screen pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-[var(--color-heading)] font-serif mb-6">
              {copy.heading}
            </h1>
            <p className="text-lg text-[var(--color-text)] max-w-2xl mx-auto">
              {copy.intro}
            </p>
          </div>
          <ConsultationForm />
        </div>
      </main>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
      <BodyClosing />
    </SiteWrapper>
  );
}
