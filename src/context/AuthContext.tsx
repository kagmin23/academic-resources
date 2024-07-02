import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  role: string; // Adjust according to your role structure
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');

  const login = () => {
    setIsLoggedIn(true);
    // Optionally set role when login (e.g., from user data)
    // setRole(user.role); // Uncomment if setting role here
  };

  const logout = () => {
    setIsLoggedIn(false);
    setRole('');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useRole = (): string => {
  const { role } = useAuth();
  return role;
};
