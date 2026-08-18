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
import { useCmsHomeContent } from "@/hooks/useCmsHomeContent";
import { useLocation } from "react-router-dom";
import { CmsModeSwitcher } from "@/components/CmsModeSwitcher";

const HomePage = () => {
  const location = useLocation();
  const { content, cmsMode, previewMode } = useCmsHomeContent(location.search);

  return (
    <SiteWrapper>
      {previewMode ? (
        <div className="sticky top-0 z-[80] bg-[hsl(var(--terracotta-main))] px-4 py-2 text-center text-sm font-medium text-white">
          Live preview — changes appear here before you Save in the editor
        </div>
      ) : null}
      <Header />
      <MainContentWrapper>
        <Hero
          badgeLeft={content.hero.badgeLeft}
          badgeRight={content.hero.badgeRight}
          heading={content.hero.heading}
          description={content.hero.description}
        />
        <Introduction
          heading={content.introduction.heading}
          description={content.introduction.description}
          buttonText={content.introduction.buttonText}
          buttonLink={content.introduction.buttonLink}
        />
        <ServicesGrid />
        <MeetYourTherapists />
        <PracticeManager />
        <LocationMap />
        <Testimonial
          quote={content.testimonial.quote}
          author={content.testimonial.author}
        />
        <Cta badge={content.cta.badge} heading={content.cta.heading} />
        {/* Sections will be added here */}
      </MainContentWrapper>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
      <NewsletterPopup />
      <SvgDefinitions />
      <BodyClosing />
      {!previewMode ? <CmsModeSwitcher mode={cmsMode} /> : null}
    </SiteWrapper>
  );
};

export default HomePage;
