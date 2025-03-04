import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { requestNotificationPermission } from "./utils/app/AppNotifications";

interface ProtectedRouteProps {
  children: React.ReactNode;
  type?: string | null;
}

const ProtectedRoute = ({ children, type = null }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();
  useEffect(requestNotificationPermission, []);

  if(type){
    if(type === "user" && user?.is_admin){
      return <Navigate to="/admin-panel/dashboard" />
    }
    if(type === "admin" && !user?.is_admin){
      return <Navigate to="/member/dashboard" />
    }
  }

  // return children;
  return isAuthenticated ? (
    children
  ) : (
    <Navigate to={user?.is_admin ? "/admin-panel/auth" : "/auth/sign-in"} />
  );
};

export default ProtectedRoute;
