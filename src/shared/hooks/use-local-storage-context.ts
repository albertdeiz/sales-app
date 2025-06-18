import { useContext } from "react";
import { LocalStorageContext } from "../contexts/local-storage.context";

export const useLocalStorageContext = () => {
  const context = useContext(LocalStorageContext);

  if (!context) {
    throw new Error("useLocalStorageContext must be used within a LocalStorageProvider");
  }

  return context;
};
