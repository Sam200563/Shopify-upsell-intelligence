import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Configure default base URL
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
console.log('API Base URL:', axios.defaults.baseURL);

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            localStorage.setItem("token", token);
            // Decode or fetch user profile if needed. For now assuming token persistence is enough for session
            // Ideally we fetch /auth/me or store user in localstorage too. 
            // Simplified: Store user in localstorage for persistence or just decode.
            const storedUser = localStorage.getItem("user");
            if (storedUser) setUser(JSON.parse(storedUser));
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setUser(null);
        }
        setLoading(false);
    }, [token]);

    const login = async (email, password) => {
        try {
            console.log('Attempting login to:', axios.defaults.baseURL + "/auth/login");
            const res = await axios.post("/auth/login", { email, password });
            console.log('Login success:', res.data);
            setToken(res.data.token);
            setUser(res.data);
            localStorage.setItem("user", JSON.stringify(res.data));
            return res.data;
        } catch (error) {
            console.error('Login error details:', error);
            throw error;
        }
    };

    const register = async (name, email, password) => {
        const res = await axios.post("/auth/register", { name, email, password });
        setToken(res.data.token);
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        return res.data;
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
