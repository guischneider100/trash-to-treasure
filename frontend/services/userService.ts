import { ExistingUser, NewUser } from "../types/User";
import api from "./api";

//create User
export const createUser = async (user: NewUser): Promise<ExistingUser> => {
    const response = await api.post<ExistingUser>("/auth/register", user);
    return response.data;
}

export const getUserById = async (id: number): Promise<ExistingUser> => {
    const response = await api.get<ExistingUser>(`/user/${id}`);
    return response.data;
}