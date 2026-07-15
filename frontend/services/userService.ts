import { AuthResponse, ChangePassword } from "../types/Auth";
import { ExistingUser, LoginUser, NewUser } from "../types/User";
import api from "./api";

export const createUser = async (user: NewUser): Promise<AuthResponse> => {
  return (await api.post<AuthResponse>("/auth/register", user)).data;
};

export const login = async (user: LoginUser): Promise<AuthResponse> => {
  return (await api.post<AuthResponse>(`/auth/login`, user)).data;
};

export const getMe = async(): Promise<ExistingUser> => {
  const response = await api.get<ExistingUser>(`/auth/me`);
  return response.data;
};

export const deleteAccount = async(): Promise<void> => {
  const response = await api.delete<void>(`/user/me`);
  return response.data;
};
