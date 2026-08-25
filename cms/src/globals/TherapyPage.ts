import type { GlobalConfig } from "payload";

import { totpPublicRead } from "../access/content";
import { isLoggedIn } from "../access/roles";

const trackFields = (label: string) => [
  { name: "heading", type: "text" as const, required: true, label: `${label} heading` },
  {
    name: "intro",
    type: "textarea" as const,
    required: true,
    label: `${label} introduction`,
  },
  {
    name: "body",
    type: "textarea" as const,
    required: true,
    label: `${label} page text`,
  },
  {
    name: "photo",
    type: "upload" as const,
    relationTo: "media" as const,
    label: "Photo (optional)",
  },
];

export const TherapyPage: GlobalConfig = {
  slug: "therapy-page",
  label: "Therapy pages",
  admin: {
    group: "Website",
    description:
      "The Therapy section of the site: overview, Adult, and Kids / Young Adult.",
  },
  access: {
    read: () => true,
    update: isLoggedIn,
  },
  custom: totpPublicRead,
  fields: [
    {
      name: "overview",
      type: "group",
      label: "Therapy overview (/therapy)",
      fields: [
        { name: "heading", type: "text", required: true },
        { name: "intro", type: "textarea", required: true },
        {
          name: "adultCardTitle",
          type: "text",
          defaultValue: "Adult",
        },
        {
          name: "adultCardText",
          type: "textarea",
          required: true,
        },
        {
          name: "youthCardTitle",
          type: "text",
          defaultValue: "Kids / Young Adult",
        },
        {
          name: "youthCardText",
          type: "textarea",
          required: true,
        },
      ],
    },
    {
      name: "adult",
      type: "group",
      label: "Adult therapy",
      fields: trackFields("Adult"),
    },
    {
      name: "youth",
      type: "group",
      label: "Kids / Young Adult therapy",
      fields: trackFields("Kids / Young Adult"),
    },
  ],
};
