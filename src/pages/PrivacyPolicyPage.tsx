import { SiteWrapper } from "@/components/sections/SiteWrapper";
import { Header } from "@/components/sections/Header";
import { MainContentWrapper } from "@/components/sections/MainContentWrapper";
import { FooterWrapper } from "@/components/sections/FooterWrapper";
import { Footer } from "@/components/sections/Footer";

const PrivacyPolicyPage = () => {
  return (
    <SiteWrapper>
      <Header />
      <MainContentWrapper>
        <section className="py-32 md:py-40 bg-[hsl(var(--cream))] min-h-screen">
          <div className="container mx-auto px-6 max-w-3xl bg-white p-10 md:p-16 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h1 className="text-4xl md:text-5xl font-serif text-[hsl(var(--terracotta-main))] mb-8 text-center">Privacy Policy</h1>
            <div className="prose prose-stone max-w-none text-[hsl(var(--warm-gray))] space-y-6 font-light">
              <p className="text-center text-sm mb-12"><em>Last updated: June 17, 2026</em></p>
              
              <p>The Calhoun Practice is committed to protecting the privacy and confidentiality of everyone who contacts us or receives services.</p>
              
              <h2 className="text-2xl font-serif text-[hsl(var(--terracotta-main))] mt-10 mb-4 border-b border-[hsl(var(--terracotta-main))]/20 pb-4">Information We Collect</h2>
              <p>We collect only the information necessary to respond to your inquiry or provide care: name, email address, phone number (if provided), and a brief description of what you are seeking help with.</p>
              
              <h2 className="text-2xl font-serif text-[hsl(var(--terracotta-main))] mt-10 mb-4 border-b border-[hsl(var(--terracotta-main))]/20 pb-4">How We Use Your Information</h2>
              <p>We use your information solely to contact you about therapy services and to match you with the most appropriate therapist. We never sell, share, or use your information for marketing purposes.</p>
              
              <h2 className="text-2xl font-serif text-[hsl(var(--terracotta-main))] mt-10 mb-4 border-b border-[hsl(var(--terracotta-main))]/20 pb-4">Confidentiality</h2>
              <p>All communications and therapy sessions are kept strictly confidential in accordance with professional ethical standards and applicable UK laws. We will only disclose information when required by law or with your explicit written consent.</p>
              
              <h2 className="text-2xl font-serif text-[hsl(var(--terracotta-main))] mt-10 mb-4 border-b border-[hsl(var(--terracotta-main))]/20 pb-4">Data Security</h2>
              <p>We use reasonable technical and organizational measures to protect your information.</p>
              
              <h2 className="text-2xl font-serif text-[hsl(var(--terracotta-main))] mt-10 mb-4 border-b border-[hsl(var(--terracotta-main))]/20 pb-4">Your Rights</h2>
              <p>You may request access to, correction of, or deletion of your personal information at any time by contacting us.</p>
              
              <h2 className="text-2xl font-serif text-[hsl(var(--terracotta-main))] mt-10 mb-4 border-b border-[hsl(var(--terracotta-main))]/20 pb-4">Contact Us</h2>
              <p>If you have questions about this policy, please email or call us using the details in the footer.</p>
              
              <p className="text-sm text-[hsl(var(--warm-gray))]/70 mt-16 italic border-t border-[hsl(var(--light-gray))] pt-6 text-center">This is a draft. Have a legal professional review it for your specific situation before publishing.</p>
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
