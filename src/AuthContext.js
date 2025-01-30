import React, { createContext, useContext } from "react";
import { useCookies } from "react-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [_, setCookies] = useCookies(["access_token"]);

  const login = (data) => {
    setCookies("access_token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  };

  const logout = () => {
    localStorage.removeItem("user");
  };

  const user = () => JSON.parse(localStorage.getItem("user"));

  return (
    <AuthContext.Provider value={{ login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
