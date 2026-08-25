import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { SiteWrapper } from "@/components/sections/SiteWrapper";
import { Header } from "@/components/sections/Header";
import { FooterWrapper } from "@/components/sections/FooterWrapper";
import { Footer } from "@/components/sections/Footer";
import { usePayloadPage, useSiteChrome } from "@/hooks/useSiteChrome";
import { DEFAULT_THERAPY, mapTherapy, type TherapyTrack } from "@/lib/cms/siteContent";

function TherapyShell({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SiteWrapper>
      <Header />
      <main id="page" className="pt-32 pb-24 bg-[hsl(var(--cream))] min-h-screen">
        <div className="container mx-auto px-6 max-w-4xl">{children}</div>
      </main>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </SiteWrapper>
  );
}

export default function TherapyOverviewPage() {
  const therapy = usePayloadPage("therapy-page", mapTherapy, DEFAULT_THERAPY);

  return (
    <TherapyShell>
      <div className="bg-white p-10 md:p-16 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <h1 className="text-4xl md:text-5xl font-serif text-[hsl(var(--terracotta-main))] mb-6">
          {therapy.overview.heading}
        </h1>
        <p className="text-lg leading-relaxed text-[hsl(var(--warm-gray))] mb-12 font-light">
          {therapy.overview.intro}
        </p>
        <div className="grid gap-8 md:grid-cols-2">
          <Link
            to="/therapy/adult"
            className="rounded-2xl border border-black/5 p-8 hover:shadow-md transition-shadow bg-[hsl(var(--cream))]"
          >
            <h2 className="text-2xl font-serif mb-3">{therapy.overview.adultCardTitle}</h2>
            <p className="text-[hsl(var(--warm-gray))] font-light leading-relaxed">
              {therapy.overview.adultCardText}
            </p>
          </Link>
          <Link
            to="/therapy/kids-young-adult"
            className="rounded-2xl border border-black/5 p-8 hover:shadow-md transition-shadow bg-[hsl(var(--cream))]"
          >
            <h2 className="text-2xl font-serif mb-3">{therapy.overview.youthCardTitle}</h2>
            <p className="text-[hsl(var(--warm-gray))] font-light leading-relaxed">
              {therapy.overview.youthCardText}
            </p>
          </Link>
        </div>
      </div>
    </TherapyShell>
  );
}

function TherapyTrackPage({
  track,
  audience,
}: {
  track: TherapyTrack;
  audience: "adult" | "youth";
}) {
  const { services } = useSiteChrome();
  const related = services.filter(
    (service) => service.audience === audience || service.audience === "both",
  );

  return (
    <TherapyShell>
      <div className="bg-white p-10 md:p-16 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <p className="text-sm uppercase tracking-widest text-[hsl(var(--terracotta-main))] mb-3">
          Therapy
        </p>
        <h1 className="text-4xl md:text-5xl font-serif text-[hsl(var(--terracotta-main))] mb-6">
          {track.heading}
        </h1>
        {track.photo ? (
          <img
            src={track.photo}
            alt=""
            className="w-full h-64 object-cover rounded-2xl mb-8"
          />
        ) : null}
        <p className="text-lg leading-relaxed text-[hsl(var(--warm-gray))] mb-6 font-light">
          {track.intro}
        </p>
        <p className="leading-relaxed text-[hsl(var(--warm-gray))] mb-10 font-light whitespace-pre-line">
          {track.body}
        </p>
        {related.length > 0 ? (
          <div className="mb-10">
            <h2 className="text-2xl font-serif mb-4">Related services</h2>
            <ul className="space-y-3">
              {related.map((service) => (
                <li key={service.title} className="text-[hsl(var(--warm-gray))]">
                  <strong>{service.title}.</strong> {service.summary}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <Link
          to="/contact"
          className="inline-flex items-center justify-center bg-[hsl(var(--terracotta-main))] text-white px-8 py-3 rounded-full uppercase tracking-wider text-sm"
        >
          Request a consultation
        </Link>
      </div>
    </TherapyShell>
  );
}

export function TherapyAdultPage() {
  const therapy = usePayloadPage("therapy-page", mapTherapy, DEFAULT_THERAPY);
  return <TherapyTrackPage track={therapy.adult} audience="adult" />;
}

export function TherapyYouthPage() {
  const therapy = usePayloadPage("therapy-page", mapTherapy, DEFAULT_THERAPY);
  return <TherapyTrackPage track={therapy.youth} audience="youth" />;
}
