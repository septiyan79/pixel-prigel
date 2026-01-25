import toast from "react-hot-toast";

export const useLogoutConfirm = (onLogout) => {
    const confirmLogout = () => {
        toast(
            (t) => (
                /* Menambahkan border-4, shadow, dan glassmorphism (bg-white/80 + backdrop-blur) */
                <div className="bg-white/95 backdrop-blur-md border-4 border-black p-6 rounded-[2.5rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-sm">
                    {/* Icon & Heading */}
                    <div className="flex flex-col items-center text-center gap-3 mb-5">
                        <div className="bg-yellow-400 border-4 border-black w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-6">
                            X
                        </div>
                        <h3 className="font-black uppercase italic text-2xl tracking-tighter leading-none mt-2">
                            WAIT! <span className="text-orange-600">DON'T GO!</span>
                        </h3>
                    </div>

                    <p className="font-bold text-gray-900/70 text-center text-sm leading-snug mb-8 px-2">
                        Are you sure you want to logout? We've got so many new things to show you!
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => {
                                toast.dismiss(t.id);
                                onLogout();
                            }}
                            /* Tombol utama sedikit transparan juga agar senada */
                            className="w-full px-6 py-3 font-black uppercase text-sm border-4 border-black bg-[#EE1D52]/90 hover:bg-[#EE1D52] text-white rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all backdrop-blur-sm"
                        >
                            Yes, Logout
                        </button>

                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className="w-full px-6 py-3 font-black uppercase text-sm border-4 border-black bg-white/50 hover:bg-white text-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all backdrop-blur-sm"
                        >
                            Keep Me Logged In
                        </button>
                    </div>
                </div>
            ), 
            { 
                duration: 8000,
                // PENTING: Menghilangkan styling default dari react-hot-toast
                style: {
                    background: 'transparent',
                    boxShadow: 'none',
                    padding: 0,
                    maxWidth: 'none',
                }
            }
        );
    };

    return { confirmLogout };
};