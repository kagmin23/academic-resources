import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  allowedRoles: (string | number)[];
  children: JSX.Element;
}

const ProtectedRouter: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const userData: any = localStorage.getItem('user');
  // let role: string | number | null = null;

  // console.log('userData:', userData);

  // if (userData) {
  //   try {
  //     const parsedUserData = JSON.parse(userData);
  //     role = parsedUserData.role;  // Kiểm tra key roleId trong userData
      
  //   } catch (error) {
  //     console.error('Error parsing userData:', error);
  //   }
  // }

  // if (role === null || !allowedRoles.includes(role)) {
  //   console.log("role:", role)
  //   return <Navigate to="/" replace />;
  // }

  if (!userData) {
    console.log("Not found user in local");
  }

  const user = JSON.parse(userData);
  if (!user) {
    return <Navigate to="/log-in" replace/>
  }

  if (allowedRoles && !allowedRoles.includes(user.data.role)) {
    return <Navigate to="/" replace/>
  }

  return children;
}

export default ProtectedRouter;
