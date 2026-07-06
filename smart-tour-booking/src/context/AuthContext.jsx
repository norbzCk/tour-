import { createContext, useContext, useState } from "react";

/* eslint-disable react-refresh/only-export-components */
const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    await new Promise((resolve) => setTimeout(resolve, 900));
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    let role = "tourist";
    if (email.includes("admin")) {
      role = "admin";
    } else if (email.includes("guide")) {
      role = "guide";
    } else if (email.includes("operator")) {
      role = "operator";
    }
    setUser({ name: email.split("@")[0], email, role });
    return role;
  };

  const logout = () => setUser(null);

  const updateCurrentUser = (data) => {
    setUser((prev) => (prev ? { ...prev, ...data } : null));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
