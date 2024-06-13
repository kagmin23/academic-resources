import React, { ReactNode, createContext, useContext, useState } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  role: string; // Thêm trường role vào AuthContextType
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(''); // Khởi tạo state cho vai trò

  const login = () => {
    setIsLoggedIn(true);
    // Set role khi đăng nhập thành công (đây chỉ là một ví dụ, bạn có thể cần lấy vai trò từ API hoặc từ localStorage)
    setRole('student'); // Thay 'student' bằng vai trò tương ứng
  };

  const logout = () => {
    setIsLoggedIn(false);
    setRole(''); // Đăng xuất thì reset vai trò
  };

  const useRole = (): string => {
    return role;
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, role }}> {/* Thêm role vào giá trị của Context */}
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
