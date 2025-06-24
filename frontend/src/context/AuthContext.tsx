import { createContext, useEffect, useState, type ReactNode } from "react";
import axios from "axios";
interface AuthContextType {
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  isAuthenticated: boolean;
  authLoading: boolean;
  token: string | null;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [authLoading, setAuthLoading] = useState(false);
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
      setAuthLoading(true);
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_BASE + "api/login",
        {
          email,
          password,
        }
      );
      if (response.data.token) {
        setToken(response.data.token);
      }
      return true;
    } catch (err) {
      console.log("error ", err);
      return false;
    } finally {
      setAuthLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      setAuthLoading(true);
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_BASE + "api/signup",
        {
          email,
          password,
          name,
        }
      );
      console.log("Signup up", response);
      return true;
    } catch (err) {
      console.log("Error signing up ", err);
      return false;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ login, signup, isAuthenticated, authLoading, token, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
