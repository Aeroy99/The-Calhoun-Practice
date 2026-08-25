import type { Access, FieldAccess } from "payload";

type RoleUser = {
  id?: string | number;
  role?: "admin" | "editor" | string;
};

export function getUserRole(user: unknown): RoleUser["role"] | undefined {
  return (user as RoleUser | null | undefined)?.role;
}

export const isAdmin: Access = ({ req }) => getUserRole(req.user) === "admin";

export const isLoggedIn: Access = ({ req }) => Boolean(req.user);

export const isAdminOrSelf: Access = ({ req }) => {
  if (!req.user) {
    return false;
  }
  if (getUserRole(req.user) === "admin") {
    return true;
  }
  return {
    id: {
      equals: (req.user as RoleUser).id,
    },
  };
};

export const adminFieldAccess: FieldAccess = ({ req }) =>
  getUserRole(req.user) === "admin";
