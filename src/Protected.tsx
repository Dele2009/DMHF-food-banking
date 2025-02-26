import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { requestNotificationPermission } from "./utils/app/AppNotifications";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();
  useEffect(requestNotificationPermission, []);

  // return children;
  return isAuthenticated ? (
    children
  ) : (
    <Navigate to={user?.is_admin ? "" : "/auth/sign-in"} />
  );
};

export default ProtectedRoute;
