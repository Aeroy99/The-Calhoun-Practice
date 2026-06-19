export interface HomeContent {
  hero: {
    badgeLeft: string;
    badgeRight: string;
    heading: string;
    description: string;
  };
  introduction: {
    heading: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
  cta: {
    badge: string;
    heading: string;
  };
  testimonial: {
    quote: string;
    author: string;
  };
}

export const DEFAULT_HOME_CONTENT: HomeContent = {
  hero: {
    badgeLeft: "Confidential Care",
    badgeRight: "Licensed Professionals",
    heading: "Find clarity and connection in a safe space.",
    description:
      "Modern couples therapy, individual healing, and premarital counselling in Surrey. We're here to support your journey.",
  },
  introduction: {
    heading: "We're here to help your relationships thrive",
    description:
      "We provide an empathetic, supportive space for you to explore your feelings and work towards a healthier, happier life. Our experienced therapists are dedicated to guiding you through your journey of growth and healing.",
    buttonText: "Meet Founder therapist for Calhoun Practice",
    buttonLink: "/#therapists",
  },
  cta: {
    badge: "Safe Space",
    heading: "Ready to get started? Let's connect today.",
  },
  testimonial: {
    quote:
      '"I feel so much more confident and grounded after working with the team. The personalized approach really made a difference in my daily life."',
    author: "Client",
  },
};

type UnknownRecord = Record<string, unknown>;

function asRecord(value: unknown): UnknownRecord {
  if (value && typeof value === "object") {
    return value as UnknownRecord;
  }
  return {};
}

function getString(
  value: unknown,
  fallback: string,
): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function getLink(value: unknown, fallback: string): string {
  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }

  const link = asRecord(value);
  const cachedUrl = getString(link.cached_url, "");
  if (cachedUrl) {
    return cachedUrl.startsWith("/") ? cachedUrl : `/${cachedUrl}`;
  }

  const url = getString(link.url, "");
  if (url) {
    return url;
  }

  return fallback;
}

export function mapStoryblokHomeContent(raw: unknown): HomeContent {
  const content = asRecord(raw);
  const hero = asRecord(content.hero);
  const introduction = asRecord(content.introduction);
  const cta = asRecord(content.cta);
  const testimonial = asRecord(content.testimonial);

  return {
    hero: {
      badgeLeft: getString(
        hero.badge_left ?? content.hero_badge_left,
        DEFAULT_HOME_CONTENT.hero.badgeLeft,
      ),
      badgeRight: getString(
        hero.badge_right ?? content.hero_badge_right,
        DEFAULT_HOME_CONTENT.hero.badgeRight,
      ),
      heading: getString(
        hero.heading ?? content.hero_heading,
        DEFAULT_HOME_CONTENT.hero.heading,
      ),
      description: getString(
        hero.description ?? content.hero_description,
        DEFAULT_HOME_CONTENT.hero.description,
      ),
    },
    introduction: {
      heading: getString(
        introduction.heading ?? content.intro_heading,
        DEFAULT_HOME_CONTENT.introduction.heading,
      ),
      description: getString(
        introduction.description ?? content.intro_description,
        DEFAULT_HOME_CONTENT.introduction.description,
      ),
      buttonText: getString(
        introduction.button_text ?? content.intro_button_text,
        DEFAULT_HOME_CONTENT.introduction.buttonText,
      ),
      buttonLink: getLink(
        introduction.button_link ?? content.intro_button_link,
        DEFAULT_HOME_CONTENT.introduction.buttonLink,
      ),
    },
    cta: {
      badge: getString(
        cta.badge ?? content.cta_badge,
        DEFAULT_HOME_CONTENT.cta.badge,
      ),
      heading: getString(
        cta.heading ?? content.cta_heading,
        DEFAULT_HOME_CONTENT.cta.heading,
      ),
    },
    testimonial: {
      quote: getString(
        testimonial.quote ?? content.testimonial_quote,
        DEFAULT_HOME_CONTENT.testimonial.quote,
      ),
      author: getString(
        testimonial.author ?? content.testimonial_author,
        DEFAULT_HOME_CONTENT.testimonial.author,
      ),
    },
  };
}
