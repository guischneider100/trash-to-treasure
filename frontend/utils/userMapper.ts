import { ExistingUser } from "../types/User";

export const mapUserFromBackend = (user: any): ExistingUser => ({
    id: user.id,
    email: user.email,
    mobile: user.mobile,
    password: user.password,
})