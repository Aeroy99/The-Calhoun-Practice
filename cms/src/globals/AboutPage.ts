import type { GlobalConfig } from "payload";

import { totpPublicRead } from "../access/content";
import { isLoggedIn } from "../access/roles";

export const AboutPage: GlobalConfig = {
  slug: "about-page",
  label: "About Me",
  admin: {
    group: "Website",
    description: "The About Me page. Add your photo, role, and story here.",
  },
  access: {
    read: () => true,
    update: isLoggedIn,
  },
  custom: totpPublicRead,
  fields: [
    { name: "heading", type: "text", required: true, label: "Page title" },
    { name: "name", type: "text", required: true, label: "Your name" },
    { name: "role", type: "text", required: true, label: "Role / credentials" },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      label: "Photo",
    },
    {
      name: "intro",
      type: "textarea",
      required: true,
      label: "Short introduction",
    },
    {
      name: "story",
      type: "textarea",
      required: true,
      label: "Your story",
    },
    {
      name: "buttonLabel",
      type: "text",
      defaultValue: "Start a conversation",
    },
    {
      name: "buttonLink",
      type: "text",
      defaultValue: "/contact",
    },
  ],
};
