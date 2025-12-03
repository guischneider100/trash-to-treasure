import { ExistingUser, NewUser } from "../types/User";
import api from "./api";

//create User
export const createUser = async (user: NewUser): Promise<ExistingUser> => {
    const response = await api.post<ExistingUser>("/auth/register", user);
    return response.data;
}