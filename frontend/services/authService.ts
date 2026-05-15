import { ResetPassword } from "../types/Auth"
import api from "./api"

export const requestForgotPasswordCode = async (resetPassword: ResetPassword): Promise<void>  => {
    return (await api.post<void>(`/auth/forgot-password`, resetPassword)).data;
}

export const verifyForgotPasswordCode = async (resetPassword: ResetPassword): Promise<void> => {
    return (await api.post<void>(`/auth/verify-forgot-password-code`, resetPassword)).data;
}

export const redefinePasswordAPI = async (resetPassword: ResetPassword): Promise<void> => {
    return (await api.patch<void>(`/auth/new-password`, resetPassword)).data;
}
