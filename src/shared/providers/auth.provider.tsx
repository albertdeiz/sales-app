import { useEffect, useState, type ReactNode } from "react";
import type { User } from "../interfaces/auth.interfaces";
import { AuthContext } from "../contexts/auth.context";

const TOKEN_KEY = "auth_token";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem(TOKEN_KEY);

    if (storedUser) setUser(JSON.parse(storedUser));
    setIsLoading(false);
  }, []);

  const login = async (user: User) => {
    setUser(user);
    localStorage.setItem(TOKEN_KEY, JSON.stringify(user));
  };

  const logout = () => {
    setUser(undefined);
    localStorage.removeItem(TOKEN_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};