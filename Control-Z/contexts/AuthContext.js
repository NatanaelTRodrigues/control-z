// contexts/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simula um login
  const login = () => {
    console.log('Usuário logado');
    setIsLoggedIn(true);
  };

  // Simula o registro
  const register = () => {
    console.log('Usuário registrado e logado');
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto facilmente
export const useAuth = () => {
  return useContext(AuthContext);
};