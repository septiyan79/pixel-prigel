import { Outlet } from "react-router-dom";
import { useState } from "react";

import AdmSidebar from "../components/AdmSidebar";
import AdmNavbar from "../components/AdmNavbar";

const AdmLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    }

    return (
        <div className="h-screen w-full bg-[#FFFBF7] flex overflow-hidden text-gray-800 font-sans">

            {/* --- SIDEBAR (Independent Scroll) --- */}
            <AdmSidebar sidebarOpen={sidebarOpen} />

            {/* --- RIGHT SIDE WRAPPER --- */}
            <div className="flex-1 flex flex-col min-w-0 h-screen">
                {/* --- NAVBAR (Fixed at Top) --- */}
                <AdmNavbar onToggle={toggleSidebar} />

                {/* --- MAIN CONTENT (Independent Scroll) --- */}
                <main className="flex-1 overflow-y-auto p-6 bg-[#FFFBF7] custom-scrollbar">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdmLayout;