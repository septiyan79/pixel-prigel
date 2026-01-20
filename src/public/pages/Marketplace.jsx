export default function Marketplace() {
    const marketplaces = [
        {
            name: "Shopee",
            tagline: "Diskon Ongkir & Voucher",
            color: "bg-[#EE4D2D]",
            textColor: "text-[#EE4D2D]",
            icon: "🧡",
            url: "https://shopee.co.id"
        },
        {
            name: "Tokopedia",
            tagline: "Promo Cashback Menarik",
            color: "bg-[#42B549]",
            textColor: "text-[#42B549]",
            icon: "💚",
            url: "https://tokopedia.com"
        },
        {
            name: "Etsy",
            tagline: "International Shipping",
            color: "bg-[#F1641E]",
            textColor: "text-[#F1641E]",
            icon: "🐚",
            url: "https://etsy.com"
        },
        {
            name: "Gumroad",
            tagline: "Instant Digital Download",
            color: "bg-[#36a9e1]",
            textColor: "text-[#36a9e1]",
            icon: "📦",
            url: "https://gumroad.com"
        },
        {
            name: "TikTok Shop",
            tagline: "Live Shopping Seru",
            color: "bg-[#EE1D52]",
            textColor: "text-[#EE1D52]",
            icon: "🎬",
            url: "https://tiktok.com"
        }
    ];

    return (
        <>

            {/* --- Hero Section --- */}
            <header className="pt-32 pb-16 px-6 text-center">
                <div className="inline-block bg-yellow-300 border-2 border-orange-600 px-4 py-1 rounded-full font-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(234,88,12,1)] mb-6 -rotate-2">
                    Pilih Toko Favoritmu!
                </div>
                <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-4">
                    SHOP <span className="text-orange-600">ANYWHERE.</span>
                </h1>
                <p className="font-bold text-gray-500 max-w-sm mx-auto leading-tight">
                    Kami hadir di platform kesayanganmu. Klik tombol di bawah untuk belanja lebih mudah!
                </p>
            </header>

            {/* --- Marketplaces List --- */}
            <main className="max-w-2xl mx-auto px-6 space-y-5">
                {marketplaces.map((shop, index) => (
                    <a
                        key={index}
                        href={shop.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block relative"
                    >
                        {/* Hard Shadow Layer (Warna-warni sesuai brand) */}
                        <div className={`absolute inset-0 ${shop.color} rounded-2xl translate-x-1.5 translate-y-1.5 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-200 border-2 border-black`}></div>

                        {/* Main Card Content */}
                        <div className="relative bg-white border-2 border-black p-5 rounded-2xl flex items-center justify-between group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform duration-200">
                            <div className="flex items-center gap-5">
                                {/* Icon Circle */}
                                <div className={`w-14 h-14 rounded-xl border-2 border-black ${shop.color} flex items-center justify-center text-3xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                                    {shop.icon}
                                </div>
                                <div>
                                    <h3 className={`text-xl font-black uppercase italic tracking-tight ${shop.textColor}`}>
                                        {shop.name}
                                    </h3>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                        {shop.tagline}
                                    </p>
                                </div>
                            </div>

                            {/* Arrow */}
                            <div className="bg-gray-100 p-2 rounded-lg border-2 border-black group-hover:bg-yellow-300 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 font-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </a>
                ))}
            </main>

            {/* --- Decorative Elements --- */}
            <div className="mt-20 flex justify-center gap-10 opacity-20 overflow-hidden select-none py-6">
                <span className="text-4xl font-black italic whitespace-nowrap">SHOPEE • TOKOPEDIA • ETSY • GUMROAD • TIKTOK SHOP • </span>
            </div>
        </>
    );
}