import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getMe } from "../services/userService";
import { ExistingUser } from "../types/User";
import { mapUserFromBackend } from "../utils/userMapper";
import { AuthResponse } from "../types/Auth";
import * as SecureStore from 'expo-secure-store';

interface AuthContextType {
    user: ExistingUser | null,
    token: string,
    signIn: (userLogged: AuthResponse, rememberUser: boolean) => void;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuth must be used within AuthProvider")
    }

    return context;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<ExistingUser | null>(null)
    const [token, setToken] = useState("")

    const signIn = (userLogged: AuthResponse, rememberUser: boolean) => {
        SecureStore.setItemAsync("sessionToken", userLogged.token)
        AsyncStorage.setItem("rememberUser", String(rememberUser));
        setUser(userLogged.user)
    };

    const signOut = () => {
        SecureStore.deleteItemAsync("sessionToken");
        setUser(null);
    };

    const loadSession = async () => {
        const token = await SecureStore.getItem("sessionToken")
        const rememberUser = await AsyncStorage.getItem("rememberUser")

        if (!token)
            return;

        if (rememberUser === "false")
            return;

        try {
            const user = await getMe()

            setUser(user)
            setToken(token)
        } catch (error) {
            SecureStore.deleteItemAsync("sessionToken");
        }
    }

    useEffect(() => {
        loadSession();
    }, [])

    return (
        <AuthContext.Provider value={{ user, token, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};