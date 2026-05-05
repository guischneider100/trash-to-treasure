export interface User {
    email: string,
    password: string,
    mobile: string,
}

export type NewUser = User;
export type ExistingUser = User & {id: number};