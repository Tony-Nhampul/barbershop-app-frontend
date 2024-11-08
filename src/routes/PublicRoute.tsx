import { namePersistAuth } from "../config/constants";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: React.ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
  const authUser =
    JSON.parse(sessionStorage.getItem(namePersistAuth) as string) || {};

  if (authUser && authUser?.token) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
