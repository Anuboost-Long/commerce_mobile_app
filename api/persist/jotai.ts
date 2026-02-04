import { UserProfile } from "@/@types/auth/type";
import { atom } from "jotai";

export type Persist = {
  isAuthenticated?: boolean;
  fcm_token?: string | null;
  token?: string | null;
  authorized?: string | null;
  profile?: UserProfile | null;
  language?: string;
  device_id?: string | null;
  theme?: "dark" | "light" | "system";
  notification_enable?: boolean;
};

export type PersistProp = {
  isAuthenticated: boolean;
  token?: string | null;
  fcm_token?: string | null;
  authorized?: string | null;
  profile?: UserProfile | null;
  language?: string;
  device_id?: string | null;
  theme?: "dark" | "light" | "system";
  notification_enable: boolean;
};

export const PersistAtom = atom<PersistProp>({
  isAuthenticated: false,
  token: null,
  fcm_token: null,
  profile: null,
  authorized: null,
  language: "en",
  theme: "system",
  device_id: null,
  notification_enable: false,
});
