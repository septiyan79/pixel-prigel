import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthProvider";

export default function RequireRole({ allowed }) {
  const { profile, loading } = useAuth();

  if (loading) return null;

  if (!profile || !allowed.includes(profile.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
