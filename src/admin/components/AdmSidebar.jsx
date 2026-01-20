export default function AdmSidebar( {sidebarOpen} ) {

    // Menambah menu agar terlihat efek scroll pada sidebar
    const menuItems = [
        { name: 'Dashboard', icon: '📊', active: true },
        { name: 'Inventory', icon: '🎨', active: false },
        { name: 'Orders', icon: '💰', active: false },
        { name: 'Customers', icon: '👥', active: false },
        { name: 'Coupons', icon: '🎟️', active: false },
        { name: 'Analytics', icon: '📈', active: false },
        { name: 'Reports', icon: '📄', active: false },
        { name: 'Marketing', icon: '📢', active: false },
        { name: 'Support', icon: '🎧', active: false },
        { name: 'Settings', icon: '⚙️', active: false },
        { name: 'Log Activity', icon: '📜', active: false },
    ];

    return (
        <aside className={`${sidebarOpen ? 'w-52' : 'w-16'} bg-white border-r-2 border-black flex flex-col transition-all duration-300`}>
            {/* Sidebar Header (Fixed inside Sidebar) */}
            <div className="h-14 shrink-0 flex items-center px-4 border-b-2 border-black bg-orange-200">
                <div className="w-7 h-7 bg-orange-600 border border-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-white font-black text-xs">S</div>
                {sidebarOpen && <span className="ml-3 font-black text-sm tracking-tighter">Pixel Prigel - Admin</span>}
            </div>

            {/* Sidebar Nav (Scrollable) */}
            <nav className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                {menuItems.map((item, i) => (
                    <div
                        key={i}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg border-2 transition-all cursor-pointer
                ${item.active
                                ? 'bg-orange-500 text-white border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                : 'bg-white border-transparent hover:border-orange-500 hover:bg-orange-50 text-gray-500 hover:text-orange-600'}`}
                    >
                        <span className="text-base">{item.icon}</span>
                        {sidebarOpen && <span className="font-bold uppercase text-[10px] tracking-wider">{item.name}</span>}
                    </div>
                ))}
            </nav>

            {/* Sidebar Footer (Fixed at bottom of Sidebar) */}
            <div className="p-2 border-t-2 border-black shrink-0 bg-white">
                <button className="w-full flex items-center justify-center gap-2 bg-red-50 border border-black p-1.5 rounded-lg font-black text-[10px] uppercase hover:bg-red-500 hover:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-[1px]">
                    {sidebarOpen ? 'Logout' : '🚪'}
                </button>
            </div>
        </aside>
    );
}