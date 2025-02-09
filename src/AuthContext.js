import React, { createContext, useContext, useEffect } from "react";
import { useCookies } from "react-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [_, setCookies] = useCookies(["access_token"]);

  const login = (data) => {
    setCookies("access_token", data.token);
    let user;
    if (isCompanyUser()) {
      user = data.company;
    } else {
      user = data.user;
    }
    localStorage.setItem("user", JSON.stringify({ ...user }));
    localStorage.setItem("isCompanyUser", isCompanyUser);
  };

  const logout = () => {
    localStorage.removeItem("user");
  };

  const user = () => {
    const item = localStorage.getItem("user");
    if (item !== "undefined") {
      return JSON.parse(item);
    } else {
      return null;
    }
  };

  const isCompanyUser = () => {
    return localStorage.getItem("isCompanyUser") === "true";
  };

  const setCompanyUser = (bool) => {
    localStorage.setItem("isCompanyUser", bool);
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, user, isCompanyUser, setCompanyUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
