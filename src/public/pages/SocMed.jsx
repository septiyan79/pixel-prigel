export default function SocMed() {
    const socials = [
        {
            name: "Instagram",
            handle: "@stikko.studio",
            tagline: "Daily Updates & Behind the Scenes",
            color: "bg-[#E1306C]",
            textColor: "text-[#E1306C]",
            icon: "📸",
            url: "https://instagram.com"
        },
        {
            name: "TikTok",
            handle: "@stikko.fun",
            tagline: "Fun Processes & Sticky Vibe",
            color: "bg-[#000000]",
            textColor: "text-black",
            icon: "🎵",
            url: "https://tiktok.com"
        },
        {
            name: "Pinterest",
            handle: "Stikko Studio",
            tagline: "Inspiration & Moodboards",
            color: "bg-[#BD081C]",
            textColor: "text-[#BD081C]",
            icon: "📌",
            url: "https://pinterest.com"
        },
        {
            name: "Twitter / X",
            handle: "@stikkostudio",
            tagline: "Quick News & Thoughts",
            color: "bg-[#1DA1F2]",
            textColor: "text-[#1DA1F2]",
            icon: "🐦",
            url: "https://twitter.com"
        },
        {
            name: "YouTube",
            handle: "Stikko TV",
            tagline: "Tutorials & Long Form Content",
            color: "bg-[#FF0000]",
            textColor: "text-[#FF0000]",
            icon: "📺",
            url: "https://youtube.com"
        }
    ];

    return (
        <>
            {/* --- Hero Section --- */}
            <header className="pt-32 pb-16 px-6 text-center">
                <div className="inline-block bg-orange-400 border-2 border-black px-4 py-1 rounded-full font-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-6 rotate-2">
                    Let's Get Social! ✨
                </div>
                <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-4">
                    CONNECT <span className="text-orange-600">WITH US.</span>
                </h1>
                <p className="font-bold text-gray-500 max-w-sm mx-auto leading-tight">
                    Ikuti keseruan kami setiap hari di platform favoritmu untuk info promo dan konten unik!
                </p>
            </header>

            {/* --- Social Media List --- */}
            <main className="max-w-2xl mx-auto px-6 grid grid-cols-1 gap-5">
                {socials.map((social, index) => (
                    <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block relative"
                    >
                        {/* Hard Shadow Layer */}
                        <div className={`absolute inset-0 ${social.color} rounded-2xl translate-x-1.5 translate-y-1.5 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-200 border-2 border-black`}></div>

                        {/* Main Card Content */}
                        <div className="relative bg-white border-2 border-black p-5 rounded-2xl flex items-center justify-between group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform duration-200">
                            <div className="flex items-center gap-5">
                                {/* Icon Circle */}
                                <div className={`w-14 h-14 rounded-full border-2 border-black ${social.color} flex items-center justify-center text-3xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                                    {social.icon}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className={`text-xl font-black uppercase italic tracking-tight ${social.textColor}`}>
                                            {social.name}
                                        </h3>
                                        <span className="text-[10px] bg-gray-100 border border-black px-2 py-0.5 rounded font-black uppercase">
                                            {social.handle}
                                        </span>
                                    </div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
                                        {social.tagline}
                                    </p>
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="bg-black text-white px-4 py-2 rounded-xl font-black text-xs uppercase group-hover:bg-yellow-300 group-hover:text-black transition-colors border-2 border-black">
                                Follow
                            </div>
                        </div>
                    </a>
                ))}
            </main>

            {/* --- Decorative Elements --- */}
            <div className="mt-20 flex justify-center gap-10 opacity-20 overflow-hidden select-none py-6">
                <span className="text-4xl font-black italic whitespace-nowrap">INSTAGRAM • TIKTOK • PINTEREST • TWITTER • YOUTUBE • </span>
            </div>

        </>
    );
}