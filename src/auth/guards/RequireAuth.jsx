import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../AuthProvider";

export default function RequireAuth() {
  const { isLoggedIn, loading } = useAuth();
  const location = useLocation();

  if (loading) return null; // atau spinner

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }} //simpan lokasi agar nanti setelah login direct ke halaman tersimpan
      />
    );
  }

  return <Outlet />;
}
