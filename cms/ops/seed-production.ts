import pg from "pg";

import { loadCmsProductionEnv } from "./load-env.ts";

const force = process.argv.includes("--force");
const { connectionString } = loadCmsProductionEnv();

const homeSeed = {
  hero_badge_left: "Confidential Care",
  hero_badge_right: "Licensed Professionals",
  hero_heading: "Find clarity and connection in a safe space.",
  hero_description:
    "Modern couples therapy, individual healing, and premarital counselling in Surrey. We're here to support your journey.",
  introduction_heading: "We're here to help your relationships thrive",
  introduction_description:
    "We provide an empathetic, supportive space for you to explore your feelings and work towards a healthier, happier life. Our experienced therapists are dedicated to guiding you through your journey of growth and healing.",
  introduction_button_text: "Meet Founder therapist for Calhoun Practice",
  introduction_button_link: "/#therapists",
  cta_badge: "Safe Space",
  cta_heading: "Ready to get started? Let's connect today.",
  testimonial_quote:
    '"I feel so much more confident and grounded after working with the team. The personalized approach really made a difference in my daily life."',
  testimonial_author: "Client",
};

const client = new pg.Client({
  connectionString,
  connectionTimeoutMillis: 20000,
});

try {
  await client.connect();
  const existing = await client.query("SELECT id FROM home_page LIMIT 1");
  if ((existing.rowCount ?? 0) > 0) {
    if (!force) {
      console.log("Homepage content already exists; skipping (pass --force to overwrite).");
      process.exit(0);
    }
    await client.query(
      `UPDATE home_page SET
        hero_badge_left = $1,
        hero_badge_right = $2,
        hero_heading = $3,
        hero_description = $4,
        introduction_heading = $5,
        introduction_description = $6,
        introduction_button_text = $7,
        introduction_button_link = $8,
        cta_badge = $9,
        cta_heading = $10,
        testimonial_quote = $11,
        testimonial_author = $12,
        updated_at = NOW()`,
      Object.values(homeSeed),
    );
    console.log("Updated existing Homepage content (--force).");
  } else {
    await client.query(
      `INSERT INTO home_page (
        hero_badge_left, hero_badge_right, hero_heading, hero_description,
        introduction_heading, introduction_description, introduction_button_text, introduction_button_link,
        cta_badge, cta_heading, testimonial_quote, testimonial_author, updated_at, created_at
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12, NOW(), NOW())`,
      Object.values(homeSeed),
    );
    console.log("Inserted Homepage content.");
  }
} catch (error) {
  console.error("ERR", error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  await client.end();
}
