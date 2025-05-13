import { createContext } from "react";
import type { User } from "../interfaces/auth.interfaces";


interface AuthContextType {
  user?: User;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  logout(): void;
  login(user: User): void;
}


export const AuthContext = createContext<AuthContextType | undefined>(undefined);