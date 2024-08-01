import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  allowedRoles: (string | number)[];
  children: JSX.Element;
}

const ProtectedRouter: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const userData: any = localStorage.getItem('user');

  if (!userData) {
  }

  const user = JSON.parse(userData);
  if (!user) {
    return <Navigate to="/log-in" replace/>
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace/>
  }

  return children;
}

export default ProtectedRouter;
