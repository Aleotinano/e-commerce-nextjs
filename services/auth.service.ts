import { fetcher } from "../lib/api";
import {
  LoginInput,
  LoginResponse,
  LogoutResponse,
  RegisterInput,
  RegisterOutput,
  UserData,
} from "../types/auth";

export const authService = {
  register: (usuario: RegisterInput) =>
    fetcher<RegisterOutput>("/auth/register", {
      method: "POST",
      body: JSON.stringify(usuario),
    }),

  login: (usuario: LoginInput) =>
    fetcher<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(usuario),
    }),

  me: async () => {
    const res = await fetcher<{ usuario: UserData }>("/auth/me");
    return res;
  },

  logout: () =>
    fetcher<LogoutResponse>("/auth/logout", {
      method: "POST",
    }),
};
