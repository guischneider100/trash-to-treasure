import { AuthResponse } from "../types/Auth";
import { ExistingUser, LoginUser, NewUser } from "../types/User";
import api from "./api";

export const createUser = async (user: NewUser): Promise<ExistingUser> => {
  return (await api.post<ExistingUser>("/auth/register", user)).data;
};

export const login = async (user: LoginUser): Promise<AuthResponse> => {
  return (await api.post<AuthResponse>(`/auth/login`, user)).data;
};

export const getMe = async(): Promise<ExistingUser> => {
  const response = await api.get<ExistingUser>(`/auth/me`);
  return response.data;
}
