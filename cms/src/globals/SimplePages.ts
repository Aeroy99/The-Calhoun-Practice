import type { GlobalConfig } from "payload";

import { totpPublicRead } from "../access/content";
import { isLoggedIn } from "../access/roles";

export const ContactPage: GlobalConfig = {
  slug: "contact-page",
  label: "Contact page",
  admin: {
    group: "Website",
    description: "The heading and intro above the consultation form.",
  },
  access: {
    read: () => true,
    update: isLoggedIn,
  },
  custom: totpPublicRead,
  fields: [
    { name: "heading", type: "text", required: true },
    { name: "intro", type: "textarea", required: true },
  ],
};

export const FeesPage: GlobalConfig = {
  slug: "fees-page",
  label: "Fees & FAQ",
  admin: {
    group: "Website",
    description: "Add or rewrite fee and FAQ sections whenever they change.",
  },
  access: {
    read: () => true,
    update: isLoggedIn,
  },
  custom: totpPublicRead,
  fields: [
    { name: "heading", type: "text", required: true, defaultValue: "Fees & FAQ" },
    {
      name: "sections",
      type: "array",
      label: "Sections",
      minRows: 1,
      fields: [
        { name: "heading", type: "text", required: true },
        { name: "body", type: "textarea", required: true },
      ],
    },
  ],
};

export const PrivacyPage: GlobalConfig = {
  slug: "privacy-page",
  label: "Privacy Policy",
  admin: {
    group: "Website",
    description: "Privacy policy wording. Have a solicitor review before you publish changes.",
  },
  access: {
    read: () => true,
    update: isLoggedIn,
  },
  custom: totpPublicRead,
  fields: [
    { name: "heading", type: "text", required: true, defaultValue: "Privacy Policy" },
    { name: "lastUpdated", type: "text", label: "Last updated" },
    {
      name: "intro",
      type: "textarea",
      required: true,
    },
    {
      name: "sections",
      type: "array",
      label: "Sections",
      fields: [
        { name: "heading", type: "text", required: true },
        { name: "body", type: "textarea", required: true },
      ],
    },
    { name: "footerNote", type: "textarea", label: "Small print at the bottom" },
  ],
};
