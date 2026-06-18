import { ExistingUser } from "./User";

export interface Auth {
    token: string;
    user: ExistingUser;
}

export interface ResetPassword {
    email?: string,
    code?: string,
    newPassword?: string
}

export interface ChangePassword {
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
}

export type AuthResponse = Auth;