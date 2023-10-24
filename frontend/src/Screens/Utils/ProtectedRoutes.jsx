import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = ({
  children,
  isAuthenticated,
  isAdmin,
  isAdminRoute,
}) => {
  let location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace={true} />;
  } else if (!isAdmin && isAdminRoute) {
    return <Navigate to="/account" state={{ from: location }} replace={true} />;
  }

  return children || <Outlet />;
};

export default ProtectedRoutes;
