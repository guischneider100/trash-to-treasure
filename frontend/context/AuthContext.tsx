import React, { createContext, useContext, ReactNode, useState } from "react";

interface AuthContextType {
    logged: boolean;
    signIn: () => void;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
    logged: false,
    signIn: () => {},
    signOut: () => {},
})

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [logged, setLogged] = useState(false);

    const signIn = () => setLogged(true);
    const signOut = () => setLogged(false);

    return (
        <AuthContext.Provider value={{ logged, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};