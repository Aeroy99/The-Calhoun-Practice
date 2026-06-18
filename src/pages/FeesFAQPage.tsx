import { SiteWrapper } from "@/components/sections/SiteWrapper";
import { Header } from "@/components/sections/Header";
import { MainContentWrapper } from "@/components/sections/MainContentWrapper";
import { FooterWrapper } from "@/components/sections/FooterWrapper";
import { Footer } from "@/components/sections/Footer";

const FeesFAQPage = () => {
  return (
    <SiteWrapper>
      <Header />
      <MainContentWrapper>
        <section className="py-32 md:py-40 bg-[hsl(var(--cream))] min-h-screen">
          <div className="container mx-auto px-6 max-w-3xl bg-white p-10 md:p-16 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h1 className="text-4xl md:text-5xl font-serif text-[hsl(var(--terracotta-main))] mb-12 text-center">Fees & FAQ</h1>
            
            <div className="space-y-12 text-[hsl(var(--warm-gray))]">
              <section>
                <h2 className="text-2xl font-serif text-[hsl(var(--terracotta-main))] mb-4 border-b border-[hsl(var(--terracotta-main))]/20 pb-4">Session Fees</h2>
                <p className="mb-4 leading-relaxed font-light">Information about our session fees will be updated here soon.</p>
              </section>

              <section>
                <h2 className="text-2xl font-serif text-[hsl(var(--terracotta-main))] mb-4 border-b border-[hsl(var(--terracotta-main))]/20 pb-4">Insurance</h2>
                <p className="mb-4 leading-relaxed font-light">Details regarding insurance coverage and out-of-network benefits.</p>
              </section>

              <section>
                <h2 className="text-2xl font-serif text-[hsl(var(--terracotta-main))] mb-4 border-b border-[hsl(var(--terracotta-main))]/20 pb-4">Cancellation Policy</h2>
                <p className="mb-4 leading-relaxed font-light">Our policies regarding rescheduled or canceled appointments.</p>
              </section>

              <section>
                <h2 className="text-2xl font-serif text-[hsl(var(--terracotta-main))] mb-4 border-b border-[hsl(var(--terracotta-main))]/20 pb-4">What to Expect</h2>
                <p className="mb-4 leading-relaxed font-light">Information about your first session and the therapeutic process.</p>
              </section>
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
