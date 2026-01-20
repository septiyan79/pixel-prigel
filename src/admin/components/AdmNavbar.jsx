import { useState } from 'react';

export default function AdmNavbar({onToggle}) {
    const [isProfileOpen, setProfileOpen] = useState(false);

    return (
        <header className="h-14 bg-orange-50 border-b-2 border-black flex items-center justify-between px-6 shrink-0 z-40">
            <div className="flex items-center gap-4">
                <button
                    onClick={onToggle}
                    className="p-1.5 border border-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-[1px] bg-white"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <h2 className="font-black uppercase italic tracking-tight text-sm hidden md:block">AAA</h2>
            </div>

            {/* User Profile Dropdown */}
            <div className="relative">
                <button
                    onClick={() => setProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 px-2 py-1 border-2 border-black rounded-xl bg-white shadow-[3px_3px_0px_0px_rgba(234,88,12,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
                >
                    <div className="w-6 h-6 rounded-lg bg-orange-100 border border-black overflow-hidden">
                        <img src="https://via.placeholder.com/30" alt="Admin" className="w-full h-full object-cover" />
                    </div>
                    <span className="font-bold text-[11px] uppercase hidden sm:block">Fadhil S.</span>
                    <span className="text-[10px]">{isProfileOpen ? '▲' : '▼'}</span>
                </button>

                {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-44 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden z-50">
                        <button className="w-full p-3 text-left font-bold text-[11px] uppercase hover:bg-orange-50 border-b border-black">Profile</button>
                        <button className="w-full p-3 text-left font-bold text-[11px] uppercase hover:bg-orange-50 border-b border-black">Settings</button>
                        <button className="w-full p-3 text-left font-bold text-[11px] uppercase text-red-600 hover:bg-red-50">Logout</button>
                    </div>
                )}
            </div>
        </header>
    );
}