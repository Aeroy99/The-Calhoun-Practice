import type { CollectionConfig } from "payload";

import { isAdmin, isLoggedIn } from "../access/roles";

export const Passkeys: CollectionConfig = {
  slug: "passkeys",
  admin: {
    hidden: true,
    useAsTitle: "label",
  },
  access: {
    read: isLoggedIn,
    create: isLoggedIn,
    update: isAdmin,
    delete: isLoggedIn,
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      index: true,
    },
    {
      name: "label",
      type: "text",
      defaultValue: "Passkey",
    },
    {
      name: "credentialId",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "publicKey",
      type: "textarea",
      required: true,
    },
    {
      name: "counter",
      type: "number",
      required: true,
      defaultValue: 0,
    },
    {
      name: "deviceType",
      type: "text",
    },
    {
      name: "backedUp",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "transports",
      type: "json",
    },
  ],
};
