import { createContext } from "react";

import type { User } from "../interfaces/auth.interfaces";

// Define aquí todas las claves posibles y sus tipos
export interface LocalStorageSchema {
  user: User,
  userPreferences: {
    theme: 'light' | 'dark';
    language: string;
  };
  authToken: string;
  sessionExpiry: Date;
}

export interface LocalStorageContextValues {
  setItem: <K extends keyof LocalStorageSchema>(key: K, value: LocalStorageSchema[K]) => void;
  getItem: <K extends keyof LocalStorageSchema>(key: K, defaultValue?: LocalStorageSchema[K]) => LocalStorageSchema[K] | undefined;
  removeItem: (key: keyof LocalStorageSchema) => void;
  clear: () => void;
  state: Partial<LocalStorageSchema>;
}

export const LocalStorageContext = createContext<LocalStorageContextValues | undefined>(undefined);