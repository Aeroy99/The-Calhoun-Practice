import type { CollectionConfig } from "payload";

import { isAdmin, isLoggedIn } from "../access/roles";

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: "Photo / file",
    plural: "Photos & files",
  },
  admin: {
    group: "Website",
    description: "Upload photos used on the website. Add a short alt description for accessibility.",
  },
  access: {
    read: () => true,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isAdmin,
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
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: true,
};
