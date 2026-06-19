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

const HomePage = () => {
  const { content } = useCmsHomeContent();

  return (
    <SiteWrapper>
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
    </SiteWrapper>
  );
};

export default HomePage;
