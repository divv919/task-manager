import { createContext, useEffect, useState, type ReactNode } from "react";
import axios from "axios";
interface AuthContextType {
  login: (email: string, password: string) => void;
  signup: (email: string, password: string, name: string) => void;
  isAuthenticated: boolean;
  loading: boolean;
}
const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });
      if (response.data.token) {
        setToken(response.data.token);
      }
    } catch (err) {
      console.log("error ", err);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/api/signup", {
        email,
        password,
        name,
      });
      console.log("Signup up", response);
    } catch (err) {
      console.log("Error signing up ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ login, signup, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
