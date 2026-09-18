import { createContext, useContext, useState } from 'react';
import {
    saveToken,
    getToken,
    removeToken,
} from '../utils/tokenUtils';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(null);

    const login = (loginResponse) => {
        saveToken(loginResponse.token);

        setToken(loginResponse.token);

        setUser({
            userId: loginResponse.userId,
            firstName: loginResponse.firstName,
            lastName: loginResponse.lastName,
            role: loginResponse.role,
        });
    };

    const logout = () => {
        removeToken();
        setToken(null);
        setUser(null);
    };

    const isAuthenticated = Boolean(token);

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                isAuthenticated,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}