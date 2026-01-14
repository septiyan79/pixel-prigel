import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
      <nav className="bg-white/80 backdrop-blur-md border-2 border-orange-600 px-6 py-3 rounded-2xl flex items-center gap-8 shadow-[4px_4px_0px_0px_rgba(234,88,12,1)]">
        <span className="font-black text-xl tracking-tighter text-orange-600">Pixel Prigel</span>
        <div className="hidden md:flex gap-6 text-sm font-bold uppercase tracking-wider">
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
          <a href="#" className="hover:text-orange-600">Our Story</a>
          <a href="#" className="hover:text-orange-600">Marketplace</a>
          <a href="#" className="hover:text-orange-600">Social Media</a>

        </div>
        <div className="h-6 w-0.5 bg-orange-200"></div>
        <button className="relative">
          <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">2</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </button>
      </nav>
    </div>
  );
}