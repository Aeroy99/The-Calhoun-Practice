import type { GlobalConfig } from "payload";

import { totpPublicRead } from "../access/content";
import { isLoggedIn } from "../access/roles";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Menu, footer & social",
  admin: {
    group: "Website",
    description:
      "Main navigation, footer links, social accounts, and the newsletter popup. This is the website chrome your visitors see on every page.",
  },
  access: {
    read: () => true,
    update: isLoggedIn,
  },
  custom: totpPublicRead,
  fields: [
    {
      name: "navItems",
      type: "array",
      label: "Main menu",
      labels: { singular: "Menu item", plural: "Menu items" },
      minRows: 1,
      fields: [
        { name: "label", type: "text", required: true, label: "Label" },
        {
          name: "href",
          type: "text",
          required: true,
          label: "Link",
          admin: {
            description: "Example: /about or /#services",
          },
        },
        {
          name: "isButton",
          type: "checkbox",
          label: "Show as the terracotta button",
          defaultValue: false,
        },
        {
          name: "children",
          type: "array",
          label: "Dropdown links",
          fields: [
            { name: "label", type: "text", required: true },
            { name: "href", type: "text", required: true },
          ],
        },
      ],
    },
    {
      name: "footerLinks",
      type: "array",
      label: "Footer links",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
      ],
    },
    {
      name: "socialLinks",
      type: "array",
      label: "Social media",
      admin: {
        description:
          "Add Instagram, Facebook, TikTok, or others when you are ready. Leave empty to hide an icon.",
      },
      fields: [
        {
          name: "network",
          type: "select",
          required: true,
          options: [
            { label: "Instagram", value: "instagram" },
            { label: "Facebook", value: "facebook" },
            { label: "TikTok", value: "tiktok" },
          ],
        },
        {
          name: "url",
          type: "text",
          required: true,
          label: "Profile URL",
        },
      ],
    },
    {
      name: "copyrightName",
      type: "text",
      label: "Copyright name",
      defaultValue: "The Calhoun Practice",
    },
    {
      type: "group",
      name: "newsletter",
      label: "Newsletter popup",
      fields: [
        {
          name: "enabled",
          type: "checkbox",
          defaultValue: true,
          label: "Show the popup to new visitors",
        },
        { name: "heading", type: "text", defaultValue: "Join our newsletter" },
        {
          name: "description",
          type: "textarea",
          defaultValue:
            "Receive insights, resources, and updates directly to your inbox.",
        },
        { name: "buttonLabel", type: "text", defaultValue: "Subscribe" },
      ],
    },
  ],
};
