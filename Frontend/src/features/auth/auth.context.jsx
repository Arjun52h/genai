import { createContext, useState, useEffect } from "react";
import { getMe, Logout } from "./services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getandset = async () => {
            try {
                const data = await getMe();
                setUser(data.user);
            } catch (error) {
                console.log("Error at the auth.context.js:", error);
            } finally {
                setLoading(false);
            }
        };

        getandset();
    }, []);

    const logout = async () => {
        try {
            await Logout();
        } finally {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                setLoading,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
