import "dotenv/config";
import { getPayload } from "payload";

import { ensureAdminUser } from "../ops/ensure-admin";
import { DEFAULT_HOME_CONTENT } from "../../src/lib/cms/homeContent";
import {
  DEFAULT_ABOUT,
  DEFAULT_SERVICES,
  DEFAULT_SITE_CHROME,
  DEFAULT_THERAPY,
} from "../../src/lib/cms/siteContent";
import config from "./payload.config";

async function seed() {
  await ensureAdminUser();
  const payload = await getPayload({ config });

  await payload.updateGlobal({
    slug: "site-settings",
    data: DEFAULT_SITE_CHROME as never,
  });

  await payload.updateGlobal({
    slug: "home-page",
    data: {
      hero: DEFAULT_HOME_CONTENT.hero,
      introduction: DEFAULT_HOME_CONTENT.introduction,
      cta: DEFAULT_HOME_CONTENT.cta,
      testimonial: DEFAULT_HOME_CONTENT.testimonial,
      servicesHeading: DEFAULT_HOME_CONTENT.servicesHeading,
      servicesButtonLabel: DEFAULT_HOME_CONTENT.servicesButtonLabel,
      therapistHeading: DEFAULT_HOME_CONTENT.therapistHeading,
      practiceManager: DEFAULT_HOME_CONTENT.practiceManager,
      location: DEFAULT_HOME_CONTENT.location,
    },
  });

  await payload.updateGlobal({
    slug: "about-page",
    data: {
      heading: DEFAULT_ABOUT.heading,
      name: DEFAULT_ABOUT.name,
      role: DEFAULT_ABOUT.role,
      intro: DEFAULT_ABOUT.intro,
      story: DEFAULT_ABOUT.story,
      buttonLabel: DEFAULT_ABOUT.buttonLabel,
      buttonLink: DEFAULT_ABOUT.buttonLink,
    },
  });

  await payload.updateGlobal({
    slug: "therapy-page",
    data: {
      overview: DEFAULT_THERAPY.overview,
      adult: {
        heading: DEFAULT_THERAPY.adult.heading,
        intro: DEFAULT_THERAPY.adult.intro,
        body: DEFAULT_THERAPY.adult.body,
      },
      youth: {
        heading: DEFAULT_THERAPY.youth.heading,
        intro: DEFAULT_THERAPY.youth.intro,
        body: DEFAULT_THERAPY.youth.body,
      },
    },
  });

  await payload.updateGlobal({
    slug: "contact-page",
    data: {
      heading: "Start Here",
      intro:
        "Please complete the form below to request a consultation. We offer a confidential, safe space and look forward to connecting with you.",
    },
  });

  await payload.updateGlobal({
    slug: "fees-page",
    data: {
      heading: "Fees & FAQ",
      sections: [
        { heading: "Session Fees", body: "Information about our session fees will be updated here soon." },
        { heading: "Insurance", body: "Details regarding insurance coverage and out-of-network benefits." },
        { heading: "Cancellation Policy", body: "Our policies regarding rescheduled or canceled appointments." },
        { heading: "What to Expect", body: "Information about your first session and the therapeutic process." },
      ],
    },
  });

  await payload.updateGlobal({
    slug: "privacy-page",
    data: {
      heading: "Privacy Policy",
      lastUpdated: "June 17, 2026",
      intro:
        "The Calhoun Practice is committed to protecting the privacy and confidentiality of everyone who contacts us or receives services.",
      sections: [
        {
          heading: "Information We Collect",
          body: "We collect only the information necessary to respond to your inquiry or provide care.",
        },
        {
          heading: "How We Use Your Information",
          body: "We use your information solely to contact you about therapy services.",
        },
        {
          heading: "Confidentiality",
          body: "All communications and therapy sessions are kept strictly confidential.",
        },
      ],
      footerNote:
        "This is a draft. Have a legal professional review it for your specific situation before publishing.",
    },
  });

  const existingServices = await payload.find({
    collection: "services",
    limit: 1,
    overrideAccess: true,
  });
  if (existingServices.totalDocs === 0) {
    for (const [index, service] of DEFAULT_SERVICES.entries()) {
      await payload.create({
        collection: "services",
        overrideAccess: true,
        data: {
          title: service.title,
          summary: service.summary,
          details: service.details,
          audience: service.audience === "youth" ? "youth" : service.audience === "both" ? "both" : "adult",
          order: index,
          buttonLabel: service.buttonLabel,
        },
      });
    }
  }

  console.log("Seeded website content, therapy pages, About Me, and services.");
  console.log(
    `Open ${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"}/admin — Website group for copy, Planner notes for requests to Aaron.`,
  );
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
