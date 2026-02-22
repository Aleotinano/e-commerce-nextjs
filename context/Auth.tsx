"use client";

import { createContext, useEffect, useState } from "react";
import { UserData } from "@/types/auth";
import { authService } from "@/services/auth.service";
import { AuthContextType } from "@/types/context";

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);

  // Hidrata el usuario al recargar usando la cookie
  useEffect(() => {
    authService
      .me()
      .then((res) => setUser(res.usuario))
      .catch(() => setUser(null));
  }, []);

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
