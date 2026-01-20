import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PubLayout() {
    return (
        <div className="min-h-screen bg-[#FFFBF7] text-gray-900 selection:bg-orange-200">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
}

