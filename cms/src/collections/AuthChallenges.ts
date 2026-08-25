import type { CollectionConfig } from "payload";

export const AuthChallenges: CollectionConfig = {
  slug: "auth-challenges",
  admin: {
    hidden: true,
  },
  access: {
    read: () => false,
    create: () => false,
    update: () => false,
    delete: () => false,
  },
  fields: [
    {
      name: "challengeKey",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "challenge",
      type: "text",
      required: true,
    },
    {
      name: "expiresAt",
      type: "date",
      required: true,
    },
  ],
};
