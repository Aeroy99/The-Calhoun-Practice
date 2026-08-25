import type { CollectionConfig } from "payload";

import { publicReadLoggedInWrite, totpPublicRead } from "../access/content";

export const Services: CollectionConfig = {
  slug: "services",
  labels: {
    singular: "Service",
    plural: "Services",
  },
  admin: {
    group: "Website",
    useAsTitle: "title",
    defaultColumns: ["title", "audience", "order"],
    description:
      "These cards appear on the homepage and can be shown on Therapy pages. Add, reorder, or hide a service here.",
  },
  access: publicReadLoggedInWrite,
  custom: totpPublicRead,
  defaultSort: "order",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Service name",
    },
    {
      name: "order",
      type: "number",
      label: "Order on the website",
      defaultValue: 0,
      admin: {
        description: "Smaller numbers appear first.",
      },
    },
    {
      name: "audience",
      type: "select",
      required: true,
      defaultValue: "both",
      options: [
        { label: "Adults", value: "adult" },
        { label: "Kids / Young Adult", value: "youth" },
        { label: "Everyone", value: "both" },
      ],
    },
    {
      name: "summary",
      type: "textarea",
      required: true,
      label: "Short description",
    },
    {
      name: "details",
      type: "textarea",
      required: true,
      label: "Longer “Learn more” text",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Photo",
    },
    {
      name: "buttonLabel",
      type: "text",
      defaultValue: "Learn More",
    },
  ],
};
