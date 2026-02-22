export interface UserData {
  id?: number;
  username: string;
  email: string;
  role: string;
}
export interface RegisterInput {
  username: string;
  password: string;
  email: string;
  role?: string;
}

export interface RegisterOutput {
  message: string;
  usuario: UserData;
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  usuario: UserData;
}

export interface LogoutResponse {
  message: string;
}
