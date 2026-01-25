import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthProvider";

export default function RequireGuest() {
  const { isLoggedIn, loading, profile } = useAuth();

  if (loading) return null;

  if (isLoggedIn) {
    // kalau admin → ke dashboard
    if (profile?.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    // role lain (future-proof)
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}