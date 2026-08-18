import "dotenv/config";
import { getPayload } from "payload";

import config from "./payload.config";

const homeSeed = {
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

async function seed() {
  const payload = await getPayload({ config });

  await payload.updateGlobal({
    slug: "home-page",
    data: homeSeed,
  });

  console.log("Seeded Homepage content global.");
  console.log(
    `Open ${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"}/admin to create your login, then edit Homepage content.`,
  );
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
