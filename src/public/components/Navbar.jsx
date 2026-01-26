import { NavLink, useNavigate } from "react-router-dom";
import { RiUser5Line, RiMenu3Line, RiLogoutBoxRLine, RiLoginBoxFill } from "react-icons/ri";

import { useAuth } from "../../auth/AuthProvider";
import { useLogoutConfirm } from "../../hooks/useLogoutConfirm";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { user } = useAuth();

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  const { confirmLogout } = useLogoutConfirm(handleLogout);

  return (
    <div className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
      <nav className="bg-white/80 backdrop-blur-md border-2 border-orange-600
                      px-6 py-3 rounded-2xl 
                      flex flex-col md:flex-row
                      items-center gap-4 md:gap-8 
                      shadow-[4px_4px_0px_0px_rgba(234,88,12,1)]">

        <div className="flex items-center justify-between w-full md:w-auto gap-25">
          <span className="font-black text-xl tracking-tighter text-orange-600">Pixel Prigel</span>

          {/* Hamburger menu untuk tampilan mobile */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <RiMenu3Line className="h-8 w-8 text-orange-600" />
            </button>
          </div>
        </div>

        <div className={`flex flex-col md:flex-row gap-4 md:gap-6 
                        text-sm font-bold uppercase tracking-wider 
                        ${menuOpen ? 'flex' : 'hidden'} md:flex`}
        >
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
        <div className="hidden md:block h-6 w-0.5 bg-orange-200"></div>

        <div className={`flex flex-col md:flex-row gap-4
                        ${!menuOpen ? 'hidden' : 'flex'} md:flex`}
        >
          {!user ?
            <NavLink to="/login" className="relative">
              {/* <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">2</span> */}
              <RiUser5Line className="h-12 w-12 md:h-8 md:w-8 text-orange-600" />
            </NavLink>
            :
            <button onClick={confirmLogout} className="relative text-orange-600 text-sm font-bold uppercase tracking-wider">
              {/* <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">2</span> */}
              <RiLogoutBoxRLine className="h-12 w-12 md:h-8 md:w-8 text-orange-600" />
            </button>
          }
        </div>


      </nav>
    </div>
  );
}