import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isCompanyUser, setIsCompanyUser] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const email = localStorage.getItem("userEmail");
      const id = localStorage.getItem("userId");
      setUser({ email, id, accessToken });
    } else {
      setUser(null);
    }
  }, []);

  const login = (data, isCompanyUser) => {
    const accessToken = data.accessToken;
    const email = data.user.email;
    const id = data.user._id;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userId", id);
    setUser({ email, id, accessToken });
    setIsCompanyUser(isCompanyUser);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    setUser(null);
    setIsCompanyUser(false);
  };

  return (
    <AuthContext.Provider value={{ login, logout, user, isCompanyUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
