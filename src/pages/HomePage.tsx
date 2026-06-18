import { SiteWrapper } from "@/components/sections/SiteWrapper";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Introduction } from "@/components/sections/Introduction";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { MeetYourTherapists } from "@/components/sections/MeetYourTherapists";
import { PracticeManager } from "@/components/sections/PracticeManager";
import { LocationMap } from "@/components/sections/LocationMap";
import { Testimonial } from "@/components/sections/Testimonial";
import { Cta } from "@/components/sections/Cta";
import { MainContentWrapper } from "@/components/sections/MainContentWrapper";
import { FooterWrapper } from "@/components/sections/FooterWrapper";
import { Footer } from "@/components/sections/Footer";
import { SvgDefinitions } from "@/components/sections/SvgDefinitions";
import { NewsletterPopup } from "@/components/sections/NewsletterPopup";
import { BodyClosing } from "@/components/sections/BodyClosing";

const HomePage = () => {
  return (
    <SiteWrapper>
      <Header />
      <MainContentWrapper>
        <Hero />
        <Introduction />
        <ServicesGrid />
        <MeetYourTherapists />
        <PracticeManager />
        <LocationMap />
        <Testimonial />
        <Cta />
        {/* Sections will be added here */}
      </MainContentWrapper>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
      <NewsletterPopup />
      <SvgDefinitions />
      <BodyClosing />
    </SiteWrapper>
  );
};

export default HomePage;
