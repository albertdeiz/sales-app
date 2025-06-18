import { createContext } from "react";

export interface LocalStorageSchema {
  userPreferences: {
    theme: "light" | "dark";
    language: string;
  };
  accessToken: string;
}

export interface LocalStorageContextValues {
  setItem: <K extends keyof LocalStorageSchema>(key: K, value: LocalStorageSchema[K]) => void;
  getItem: <K extends keyof LocalStorageSchema>(key: K, defaultValue?: LocalStorageSchema[K]) =>
    LocalStorageSchema[K] | undefined;
  removeItem: (key: keyof LocalStorageSchema) => void;
  clear: () => void;
  state: Partial<LocalStorageSchema>;
}

export const LocalStorageContext = createContext<LocalStorageContextValues | undefined>(undefined);
