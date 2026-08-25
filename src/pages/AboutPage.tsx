import { Link } from "react-router-dom";
import { SiteWrapper } from "@/components/sections/SiteWrapper";
import { Header } from "@/components/sections/Header";
import { FooterWrapper } from "@/components/sections/FooterWrapper";
import { Footer } from "@/components/sections/Footer";
import { usePayloadPage } from "@/hooks/useSiteChrome";
import { DEFAULT_ABOUT, mapAbout } from "@/lib/cms/siteContent";

export default function AboutPage() {
  const about = usePayloadPage("about-page", mapAbout, DEFAULT_ABOUT);
  const initials = about.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <SiteWrapper>
      <Header />
      <main id="page" className="pt-32 pb-24 bg-[hsl(var(--cream))] min-h-screen">
        <div className="container mx-auto px-6 max-w-3xl bg-white p-10 md:p-16 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <p className="text-sm uppercase tracking-widest text-[hsl(var(--terracotta-main))] mb-4">
            {about.role}
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-[hsl(var(--terracotta-main))] mb-8">
            {about.heading}
          </h1>
          <div className="flex justify-center mb-10">
            <div className="w-48 h-48 rounded-full overflow-hidden bg-[hsl(var(--accent))] flex items-center justify-center">
              {about.photo ? (
                <img src={about.photo} alt={about.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-5xl font-light text-white">{initials}</span>
              )}
            </div>
          </div>
          <h2 className="text-2xl font-serif mb-4">{about.name}</h2>
          <p className="text-lg leading-relaxed text-[hsl(var(--warm-gray))] mb-6 font-light">
            {about.intro}
          </p>
          <p className="leading-relaxed text-[hsl(var(--warm-gray))] mb-10 font-light whitespace-pre-line">
            {about.story}
          </p>
          <Link
            to={about.buttonLink}
            className="inline-flex items-center justify-center bg-[hsl(var(--terracotta-main))] text-white px-8 py-3 rounded-full uppercase tracking-wider text-sm"
          >
            {about.buttonLabel}
          </Link>
        </div>
      </main>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </SiteWrapper>
  );
}
