import { mediaUrl } from "./payloadClient";

type UnknownRecord = Record<string, unknown>;

function asRecord(value: unknown): UnknownRecord {
  return value && typeof value === "object" ? (value as UnknownRecord) : {};
}

function getString(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

export type NavChild = { label: string; href: string };
export type NavItem = {
  label: string;
  href: string;
  isButton: boolean;
  children: NavChild[];
};

export type SiteChrome = {
  navItems: NavItem[];
  footerLinks: NavChild[];
  socialLinks: { network: string; url: string }[];
  copyrightName: string;
  newsletter: {
    enabled: boolean;
    heading: string;
    description: string;
    buttonLabel: string;
  };
};

export const DEFAULT_SITE_CHROME: SiteChrome = {
  navItems: [
    { label: "Home", href: "/", isButton: false, children: [] },
    {
      label: "Therapy",
      href: "/therapy",
      isButton: false,
      children: [
        { label: "Adult", href: "/therapy/adult" },
        { label: "Kids / Young Adult", href: "/therapy/kids-young-adult" },
      ],
    },
    { label: "Services", href: "/#services", isButton: false, children: [] },
    { label: "About Me", href: "/about", isButton: false, children: [] },
    { label: "Fees & FAQ", href: "/fees-and-faq", isButton: false, children: [] },
    { label: "Let's Talk", href: "/contact", isButton: true, children: [] },
  ],
  footerLinks: [
    { label: "About Me", href: "/about" },
    { label: "Get Started", href: "/contact" },
    { label: "Fees & FAQ", href: "/fees-and-faq" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ],
  socialLinks: [],
  copyrightName: "The Calhoun Practice",
  newsletter: {
    enabled: true,
    heading: "Join our newsletter",
    description:
      "Receive insights, resources, and updates directly to your inbox. We send thoughtful content designed to support your relational health.",
    buttonLabel: "Subscribe",
  },
};

export type ServiceCard = {
  title: string;
  summary: string;
  details: string;
  image: string;
  audience: string;
  buttonLabel: string;
};

export const DEFAULT_SERVICES: ServiceCard[] = [
  {
    title: "Couples Therapy",
    summary:
      "Strengthen your connection, improve communication, and navigate relationship challenges together in a supportive environment.",
    details:
      "Our couples therapy provides a neutral, safe space to work through conflicts, improve communication patterns, and rebuild intimacy.",
    image: "/images/services/couples-therapy.jpg",
    audience: "adult",
    buttonLabel: "Learn More",
  },
  {
    title: "Individual Healing",
    summary:
      "Explore personal patterns, process emotions, and find your path to healing and self-discovery with compassionate guidance.",
    details:
      "Individual therapy is a collaborative journey toward self-discovery and healing.",
    image: "/images/services/individual-healing.jpg",
    audience: "both",
    buttonLabel: "Learn More",
  },
  {
    title: "Premarital Counseling",
    summary:
      "Build a strong foundation for your marriage by discussing important topics and developing tools for a lifetime of partnership.",
    details:
      "Set your marriage up for success with our premarital counseling program.",
    image: "/images/services/premarital-counseling.jpg",
    audience: "adult",
    buttonLabel: "Learn More",
  },
];

export function mapSiteChrome(raw: unknown): SiteChrome {
  const content = asRecord(raw);
  const navItems = Array.isArray(content.navItems)
    ? content.navItems.map((item) => {
        const rec = asRecord(item);
        return {
          label: getString(rec.label, "Link"),
          href: getString(rec.href, "/"),
          isButton: Boolean(rec.isButton),
          children: Array.isArray(rec.children)
            ? rec.children.map((child) => {
                const c = asRecord(child);
                return {
                  label: getString(c.label, "Link"),
                  href: getString(c.href, "/"),
                };
              })
            : [],
        };
      })
    : DEFAULT_SITE_CHROME.navItems;

  return {
    navItems: navItems.length ? navItems : DEFAULT_SITE_CHROME.navItems,
    footerLinks: Array.isArray(content.footerLinks) && content.footerLinks.length
      ? content.footerLinks.map((item) => {
          const rec = asRecord(item);
          return {
            label: getString(rec.label, "Link"),
            href: getString(rec.href, "/"),
          };
        })
      : DEFAULT_SITE_CHROME.footerLinks,
    socialLinks: Array.isArray(content.socialLinks)
      ? content.socialLinks.map((item) => {
          const rec = asRecord(item);
          return {
            network: getString(rec.network, "instagram"),
            url: getString(rec.url, ""),
          };
        })
      : [],
    copyrightName: getString(
      content.copyrightName,
      DEFAULT_SITE_CHROME.copyrightName,
    ),
    newsletter: {
      enabled:
        asRecord(content.newsletter).enabled !== false,
      heading: getString(
        asRecord(content.newsletter).heading,
        DEFAULT_SITE_CHROME.newsletter.heading,
      ),
      description: getString(
        asRecord(content.newsletter).description,
        DEFAULT_SITE_CHROME.newsletter.description,
      ),
      buttonLabel: getString(
        asRecord(content.newsletter).buttonLabel,
        DEFAULT_SITE_CHROME.newsletter.buttonLabel,
      ),
    },
  };
}

export function mapServices(raw: unknown): ServiceCard[] {
  const rawDocs = asRecord(raw).docs;
  const docs = Array.isArray(rawDocs) ? rawDocs : [];
  if (!docs.length) {
    return DEFAULT_SERVICES;
  }
  return docs.map((doc) => {
    const rec = asRecord(doc);
    return {
      title: getString(rec.title, "Service"),
      summary: getString(rec.summary, ""),
      details: getString(rec.details, ""),
      image: mediaUrl(rec.image, "/images/services/individual-healing.jpg"),
      audience: getString(rec.audience, "both"),
      buttonLabel: getString(rec.buttonLabel, "Learn More"),
    };
  });
}

export type AboutContent = {
  heading: string;
  name: string;
  role: string;
  photo: string;
  intro: string;
  story: string;
  buttonLabel: string;
  buttonLink: string;
};

export const DEFAULT_ABOUT: AboutContent = {
  heading: "About Me",
  name: "Melanie Calhoun",
  role: "Founder & CEO, LMFT",
  photo: "",
  intro:
    "Welcome to a safe, confidential space where you can explore your thoughts and feelings without judgment.",
  story:
    "My approach to therapy is warm, collaborative, and tailored to your unique needs. I specialize in working with individuals and couples navigating life transitions, relationship challenges, and personal growth. By integrating evidence-based practices with deep empathy, we will work together to uncover patterns, heal past wounds, and build a more fulfilling future.",
  buttonLabel: "Start a conversation",
  buttonLink: "/contact",
};

export function mapAbout(raw: unknown): AboutContent {
  const content = asRecord(raw);
  return {
    heading: getString(content.heading, DEFAULT_ABOUT.heading),
    name: getString(content.name, DEFAULT_ABOUT.name),
    role: getString(content.role, DEFAULT_ABOUT.role),
    photo: mediaUrl(content.photo),
    intro: getString(content.intro, DEFAULT_ABOUT.intro),
    story: getString(content.story, DEFAULT_ABOUT.story),
    buttonLabel: getString(content.buttonLabel, DEFAULT_ABOUT.buttonLabel),
    buttonLink: getString(content.buttonLink, DEFAULT_ABOUT.buttonLink),
  };
}

export type TherapyTrack = {
  heading: string;
  intro: string;
  body: string;
  photo: string;
};

export type TherapyContent = {
  overview: {
    heading: string;
    intro: string;
    adultCardTitle: string;
    adultCardText: string;
    youthCardTitle: string;
    youthCardText: string;
  };
  adult: TherapyTrack;
  youth: TherapyTrack;
};

export const DEFAULT_THERAPY: TherapyContent = {
  overview: {
    heading: "Therapy",
    intro:
      "Support for adults, children, teens, and young adults — in a calm, confidential space.",
    adultCardTitle: "Adult",
    adultCardText:
      "Individual, couples, and premarital therapy for adults who want clearer communication and a steadier relationship with themselves and others.",
    youthCardTitle: "Kids / Young Adult",
    youthCardText:
      "Age-appropriate support for children, teens, and young adults, with parents included in the process when that is helpful.",
  },
  adult: {
    heading: "Adult therapy",
    intro:
      "A collaborative space for adults navigating relationships, transitions, and personal growth.",
    body: "Sessions are tailored to you. We can work on communication, anxiety, life changes, or the patterns that keep repeating. You set the pace; I bring structure, warmth, and evidence-based tools.",
    photo: "",
  },
  youth: {
    heading: "Kids / Young Adult therapy",
    intro:
      "Gentle, age-appropriate support for children, teenagers, and young adults.",
    body: "Younger clients need a space that feels safe and not like a classroom. We use conversation, creativity, and family involvement where it helps. Parents are partners in the work without losing the young person’s privacy.",
    photo: "",
  },
};

export function mapTherapy(raw: unknown): TherapyContent {
  const content = asRecord(raw);
  const overview = asRecord(content.overview);
  const adult = asRecord(content.adult);
  const youth = asRecord(content.youth);
  return {
    overview: {
      heading: getString(overview.heading, DEFAULT_THERAPY.overview.heading),
      intro: getString(overview.intro, DEFAULT_THERAPY.overview.intro),
      adultCardTitle: getString(
        overview.adultCardTitle,
        DEFAULT_THERAPY.overview.adultCardTitle,
      ),
      adultCardText: getString(
        overview.adultCardText,
        DEFAULT_THERAPY.overview.adultCardText,
      ),
      youthCardTitle: getString(
        overview.youthCardTitle,
        DEFAULT_THERAPY.overview.youthCardTitle,
      ),
      youthCardText: getString(
        overview.youthCardText,
        DEFAULT_THERAPY.overview.youthCardText,
      ),
    },
    adult: {
      heading: getString(adult.heading, DEFAULT_THERAPY.adult.heading),
      intro: getString(adult.intro, DEFAULT_THERAPY.adult.intro),
      body: getString(adult.body, DEFAULT_THERAPY.adult.body),
      photo: mediaUrl(adult.photo),
    },
    youth: {
      heading: getString(youth.heading, DEFAULT_THERAPY.youth.heading),
      intro: getString(youth.intro, DEFAULT_THERAPY.youth.intro),
      body: getString(youth.body, DEFAULT_THERAPY.youth.body),
      photo: mediaUrl(youth.photo),
    },
  };
}

export type PageSection = { heading: string; body: string };

export function mapSections(value: unknown, fallback: PageSection[]): PageSection[] {
  if (!Array.isArray(value) || value.length === 0) {
    return fallback;
  }
  return value.map((item) => {
    const rec = asRecord(item);
    return {
      heading: getString(rec.heading, "Section"),
      body: getString(rec.body, ""),
    };
  });
}
