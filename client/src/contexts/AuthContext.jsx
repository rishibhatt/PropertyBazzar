import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [username,setUsername] = useState(localStorage.getItem('username'));
  const [id,setId] = useState(localStorage.getItem('id'));
  const login = (newToken,newUser) => {
    setToken(newToken);
    setUsername(newUser);
    setUsername(newId);
    localStorage.setItem('token', newToken);
    localStorage.setItem('username', newUser);
    useState(localStorage.setId('id',newId));
   
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
    setId(null),
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('id');
  };

  return (
    <AuthContext.Provider value={{ token,username,id, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);