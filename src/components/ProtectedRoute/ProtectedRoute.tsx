import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";

import { isLoggedIn } from "../../services/auth.service";
import Loading from "../Loading/Loading";

function ProtectedRoute() {
  const [authenticated, setAuthenticated] =
    useState<boolean | null>(null);

  useEffect(() => {
    async function checkAuthentication() {
      const loggedIn = await isLoggedIn();
      setAuthenticated(loggedIn);
    }

    checkAuthentication();
  }, []);

  // null betyder at login-status endnu ikke er afklaret
  if (authenticated === null) {
    return <Loading message="Checking authentication..." />;
  }

  // Brugeren sendes til login hvis backend afviser authentication
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;