import { NavLink, useNavigate } from "react-router-dom";
import { RiUser5Line, RiMenu3Line, RiLogoutBoxRLine, RiLoginBoxFill } from "react-icons/ri";

import { useAuth } from "../../auth/AuthProvider";
import { useLogoutConfirm } from "../../hooks/useLogoutConfirm";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  const { confirmLogout } = useLogoutConfirm(handleLogout);

  return (
    <div className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
      <nav className="bg-white/80 backdrop-blur-md border-2 border-orange-600 px-6 py-3 rounded-2xl flex items-center gap-8 shadow-[4px_4px_0px_0px_rgba(234,88,12,1)]">
        <span className="font-black text-xl tracking-tighter text-orange-600">Pixel Prigel</span>
        
        <div className={`md:flex gap-6 text-sm font-bold uppercase tracking-wider ${menuOpen ? 'block' : 'hidden'}`}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-orange-600 ${isActive && "text-orange-500"
              }`
            }>
            Home
          </NavLink>
          <NavLink
            to="/stickers"
            className={({ isActive }) =>
              `hover:text-orange-600 ${isActive && "text-orange-500"
              }`
            }>
            Stickers
          </NavLink>
          <NavLink
            to="/story"
            className={({ isActive }) =>
              `hover:text-orange-600 ${isActive && "text-orange-500"
              }`
            }>
            Our Story
          </NavLink>
          <NavLink
            to="/marketplace"
            className={({ isActive }) =>
              `hover:text-orange-600 ${isActive && "text-orange-500"
              }`
            }>
            Marketplace
          </NavLink>
          <NavLink
            to="/socialMedia"
            className={({ isActive }) =>
              `hover:text-orange-600 ${isActive && "text-orange-500"
              }`
            }>
            Social Media
          </NavLink>

          {/* <a href="#" className="hover:text-orange-600">Social Media</a> */}

        </div>
        <div className="h-6 w-0.5 bg-orange-200"></div>

        <div className={`${ !menuOpen ? 'hidden' : 'block'} md:flex`}>
          <NavLink to="/login" className="relative">
            {/* <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">2</span> */}
            <RiUser5Line className="h-8 w-8 text-orange-600" />
          </NavLink>
          <button onClick={confirmLogout} className="relative text-orange-600 text-sm font-bold uppercase tracking-wider">
            {/* <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">2</span> */}
            <RiLoginBoxFill className="h-8 w-8 text-orange-600" />
          </button>
        </div>
        {/* Hamburger menu untuk tampilan mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <RiMenu3Line className="h-8 w-8 text-orange-600" />
          </button>
        </div>
      </nav>
    </div>
  );
}