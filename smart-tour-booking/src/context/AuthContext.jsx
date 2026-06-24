import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    await new Promise((resolve) => setTimeout(resolve, 900));
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    const role = email.includes("admin") ? "admin" : "tourist";
    setUser({ name: email.split("@")[0], email, role });
    return role;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
