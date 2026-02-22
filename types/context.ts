import { UserData } from "./auth";

export interface AuthContextType {
  user: UserData | null;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  setUser: (user: UserData | null) => void;
}
