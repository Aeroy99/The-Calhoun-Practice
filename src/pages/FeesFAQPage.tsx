import { SiteWrapper } from "@/components/sections/SiteWrapper";
import { Header } from "@/components/sections/Header";
import { MainContentWrapper } from "@/components/sections/MainContentWrapper";
import { FooterWrapper } from "@/components/sections/FooterWrapper";
import { Footer } from "@/components/sections/Footer";
import { usePayloadPage } from "@/hooks/useSiteChrome";
import { mapSections } from "@/lib/cms/siteContent";

const fallbackSections = [
  { heading: "Session Fees", body: "Information about our session fees will be updated here soon." },
  { heading: "Insurance", body: "Details regarding insurance coverage and out-of-network benefits." },
  { heading: "Cancellation Policy", body: "Our policies regarding rescheduled or canceled appointments." },
  { heading: "What to Expect", body: "Information about your first session and the therapeutic process." },
];

const FeesFAQPage = () => {
  const page = usePayloadPage(
    "fees-page",
    (raw) => {
      const rec = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
      return {
        heading: typeof rec.heading === "string" ? rec.heading : "Fees & FAQ",
        sections: mapSections(rec.sections, fallbackSections),
      };
    },
    { heading: "Fees & FAQ", sections: fallbackSections },
  );

  return (
    <SiteWrapper>
      <Header />
      <MainContentWrapper>
        <section className="py-32 md:py-40 bg-[hsl(var(--cream))] min-h-screen">
          <div className="container mx-auto px-6 max-w-3xl bg-white p-10 md:p-16 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h1 className="text-4xl md:text-5xl font-serif text-[hsl(var(--terracotta-main))] mb-12 text-center">
              {page.heading}
            </h1>
            <div className="space-y-12 text-[hsl(var(--warm-gray))]">
              {page.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-2xl font-serif text-[hsl(var(--terracotta-main))] mb-4 border-b border-[hsl(var(--terracotta-main))]/20 pb-4">
                    {section.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed font-light whitespace-pre-line">
                    {section.body}
                  </p>
                </section>
              ))}
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

export default FeesFAQPage;
