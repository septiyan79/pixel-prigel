import AdmSidebar from "../components/AdmSidebar";
import AdmNavbar from "../components/AdmNavbar";

const AdmLayout = ({ children, pageTitle }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="h-screen w-full bg-[#FFFBF7] flex overflow-hidden text-gray-800 font-sans">

            {/* --- SIDEBAR (Independent Scroll) --- */}
            <AdmSidebar isSidebarOpen={isSidebarOpen} />

            {/* --- RIGHT SIDE WRAPPER --- */}
            <div className="flex-1 flex flex-col min-w-0 h-screen">
                {/* --- NAVBAR (Fixed at Top) --- */}
                <AdmNavbar pageTitle={pageTitle}/>

                {/* --- MAIN CONTENT (Independent Scroll) --- */}
                <main className="flex-1 overflow-y-auto p-6 bg-[#FFFBF7] custom-scrollbar">
                    {children}
                </main>

            </div>
        </div>
    );
};