import { isLoggedIn } from "./roles";

export const totpPublicRead = {
  totp: {
    disableAccessWrapper: {
      read: true,
    },
  },
};

export const publicReadLoggedInWrite = {
  read: () => true,
  create: isLoggedIn,
  update: isLoggedIn,
  delete: isLoggedIn,
};
