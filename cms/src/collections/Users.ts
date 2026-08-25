import type { CollectionConfig } from "payload";

import { adminFieldAccess, getUserRole, isAdmin, isAdminOrSelf } from "../access/roles";
import { debugLog } from "../lib/debug-log";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "name", "role"],
    group: "Accounts",
  },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
    tokenExpiration: 60 * 60 * 8,
    cookies: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    },
  },
  access: {
    create: ({ req }) => {
      const allowed = getUserRole(req.user) === "admin";
      debugLog(
        "cms/src/collections/Users.ts:access.create",
        "user create access check",
        {
          hasUser: Boolean(req.user),
          role: getUserRole(req.user) ?? null,
          allowed,
        },
        "E",
      );
      return allowed;
    },
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  hooks: {
    beforeOperation: [
      async ({ operation, req, overrideAccess }) => {
        if (overrideAccess || operation !== "create" || req.user) {
          return;
        }

        const { totalDocs } = await req.payload.count({ collection: "users" });
        const allowLocalFirstUser =
          process.env.NODE_ENV !== "production" &&
          process.env.ALLOW_PUBLIC_FIRST_USER === "true";

        debugLog(
          "cms/src/collections/Users.ts:beforeOperation",
          "blocked or allowed unauthenticated user create",
          {
            totalDocs,
            allowLocalFirstUser,
            isProduction: process.env.NODE_ENV === "production",
          },
          "E",
        );

        if (!allowLocalFirstUser || totalDocs > 0) {
          throw new Error(
            "Public user registration is disabled. Create accounts from an existing admin or ops/ensure-admin.ts.",
          );
        }
      },
    ],
  },
  fields: [
    {
      name: "name",
      type: "text",
      admin: {
        description: "Friendly name shown in the admin (optional).",
      },
    },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
      access: {
        create: adminFieldAccess,
        update: adminFieldAccess,
      },
      admin: {
        description:
          "Admins can manage users and media. Editors can edit homepage content only.",
      },
    },
    {
      name: "passkeySetup",
      type: "ui",
      admin: {
        components: {
          Field: "/admin/PasskeyManager#PasskeyManager",
        },
      },
    },
  ],
};
