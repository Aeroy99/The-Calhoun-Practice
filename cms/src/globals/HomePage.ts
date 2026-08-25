import type { GlobalConfig } from "payload";

/**
 * Wife-facing editable homepage copy.
 * Keep labels plain-English — this is what she sees in /admin.
 */
export const HomePage: GlobalConfig = {
  slug: "home-page",
  label: "Homepage content",
  admin: {
    group: "Website",
    description:
      "Edit homepage text. Click Live Preview to see changes on the real site before you Save.",
  },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  custom: {
    totp: {
      disableAccessWrapper: {
        read: true,
      },
    },
  },
  fields: [
    {
      name: "hero",
      type: "group",
      label: "Hero (top of homepage)",
      fields: [
        {
          name: "badgeLeft",
          type: "text",
          label: "Left badge",
          required: true,
        },
        {
          name: "badgeRight",
          type: "text",
          label: "Right badge",
          required: true,
        },
        {
          name: "heading",
          type: "textarea",
          label: "Main headline",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          label: "Supporting sentence",
          required: true,
        },
      ],
    },
    {
      name: "introduction",
      type: "group",
      label: "Introduction section",
      fields: [
        {
          name: "heading",
          type: "text",
          label: "Heading",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          label: "Description",
          required: true,
        },
        {
          name: "buttonText",
          type: "text",
          label: "Button text",
          required: true,
        },
        {
          name: "buttonLink",
          type: "text",
          label: "Button link",
          required: true,
          admin: {
            description: "Usually /#therapists or another page path.",
          },
        },
      ],
    },
    {
      name: "cta",
      type: "group",
      label: "Call to action",
      fields: [
        {
          name: "badge",
          type: "text",
          label: "Badge",
          required: true,
        },
        {
          name: "heading",
          type: "textarea",
          label: "Heading",
          required: true,
        },
      ],
    },
    {
      name: "testimonial",
      type: "group",
      label: "Testimonial",
      fields: [
        {
          name: "quote",
          type: "textarea",
          label: "Quote",
          required: true,
        },
        {
          name: "author",
          type: "text",
          label: "Author label",
          required: true,
        },
      ],
    },
    {
      name: "servicesHeading",
      type: "text",
      label: "Services section heading",
      defaultValue: "How we help:",
    },
    {
      name: "servicesButtonLabel",
      type: "text",
      label: "Services bottom button",
      defaultValue: "Request a Consultation",
    },
    {
      name: "therapistHeading",
      type: "text",
      label: "Therapist section heading",
      defaultValue: "Meet your therapist",
    },
    {
      name: "practiceManager",
      type: "group",
      label: "Practice founder section",
      fields: [
        { name: "heading", type: "text", required: true },
        { name: "badge", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
        { name: "buttonLabel", type: "text", required: true },
      ],
    },
    {
      name: "location",
      type: "group",
      label: "Location section",
      fields: [
        { name: "heading", type: "textarea", required: true },
        { name: "buttonLabel", type: "text", required: true },
      ],
    },
  ],
};
