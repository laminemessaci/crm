import React from "react";

import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import AuthContext from "../../contexts/AuthContext.js";

const PrivateRoute = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoute;
