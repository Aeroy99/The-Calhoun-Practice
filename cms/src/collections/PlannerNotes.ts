import type { CollectionConfig } from "payload";

import { isAdmin, isLoggedIn, getUserRole } from "../access/roles";

export const PlannerNotes: CollectionConfig = {
  slug: "planner-notes",
  labels: {
    singular: "Planner note",
    plural: "Planner notes",
  },
  admin: {
    group: "Planner",
    useAsTitle: "title",
    defaultColumns: ["title", "kind", "status", "updatedAt"],
    description:
      "Leave a note for Aaron about a new page, social account, photo, or feature. He reviews it (often with his Cursor planner agent) before anything is built or pushed to GitHub.",
  },
  access: {
    create: isLoggedIn,
    read: isLoggedIn,
    update: isLoggedIn,
    delete: isAdmin,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "What would you like?",
    },
    {
      name: "kind",
      type: "select",
      required: true,
      defaultValue: "page",
      label: "Type",
      options: [
        { label: "New page or section", value: "page" },
        { label: "Social media", value: "social" },
        { label: "Photo or media", value: "media" },
        { label: "New feature", value: "feature" },
        { label: "Something else", value: "other" },
      ],
    },
    {
      name: "details",
      type: "textarea",
      required: true,
      label: "Details for Aaron",
      admin: {
        description:
          "Write it as you would in a planner: what should visitors see, any wording, and when you want it.",
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "Aaron is reviewing", value: "reviewing" },
        { label: "Being built", value: "building" },
        { label: "Done", value: "done" },
      ],
    },
    {
      name: "attachment",
      type: "upload",
      relationTo: "media",
      label: "Screenshot or example (optional)",
    },
    {
      name: "engineerReply",
      type: "textarea",
      label: "Aaron’s reply",
      access: {
        read: ({ req }) => Boolean(req.user),
        update: ({ req }) => getUserRole(req.user) === "admin",
      },
      admin: {
        description: "Only Aaron fills this in after he has reviewed the note.",
      },
    },
  ],
};
