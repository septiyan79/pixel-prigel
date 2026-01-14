export default function Footer() {
    return (
        <footer className="bg-white border-t-4 border-orange-600 pt-20 pb-10 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* --- Branding & Tagline --- */}
                    <div className="space-y-6">
                        <h2 className="text-4xl font-black tracking-tighter text-orange-600 italic">Pixel Prigel</h2>
                        <p className="text-gray-600 font-medium leading-relaxed">
                            A platform providing ready-to-use digital sticker designs for DIY, journaling, and creative business needs. Designed for printing, cutting, and immediate use.
                        </p>
                        {/* Social Media Icons */}
                        <div className="flex gap-3">
                            {['Instagram', 'TikTok', 'Twitter', 'Behance'].map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    className="w-10 h-10 bg-orange-100 border-2 border-orange-600 rounded-lg flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(234,88,12,1)] hover:translate-y-1 hover:shadow-none transition-all"
                                    title={social}
                                >
                                    <span className="text-[10px] font-black uppercase tracking-tighter">{social.charAt(0)}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* --- Quick Links --- */}
                    <div>
                        <h4 className="text-xl font-black uppercase italic mb-6 underline decoration-yellow-400 decoration-4">Navigation</h4>
                        <ul className="space-y-4 font-bold text-gray-500">
                            <li><a href="#" className="hover:text-orange-600 transition-colors">New Collection</a></li>
                            <li><a href="#" className="hover:text-orange-600 transition-colors">Bundling Package</a></li>
                            <li><a href="#" className="hover:text-orange-600 transition-colors">Our Story</a></li>
                            <li><a href="#" className="hover:text-orange-600 transition-colors">Marketplace</a></li>
                        </ul>
                    </div>

                    {/* --- Support & FAQ --- */}
                    <div>
                        <h4 className="text-xl font-black uppercase italic mb-6 underline decoration-yellow-400 decoration-4">Help Center</h4>
                        <ul className="space-y-4 font-bold text-gray-500">
                            <li><a href="#" className="hover:text-orange-600 transition-colors">How to Download</a></li>
                            {/* <li><a href="#" className="hover:text-orange-600 transition-colors">Lisensi Penggunaan</a></li> */}
                            <li><a href="#" className="hover:text-orange-600 transition-colors">Contact</a></li>
                            {/* <li><a href="#" className="hover:text-orange-600 transition-colors">Kebijakan Privasi</a></li> */}
                        </ul>
                    </div>

                    {/* --- Newsletter --- */}
                    <div>
                        <h4 className="text-xl font-black uppercase italic mb-6 underline decoration-yellow-400 decoration-4">Newsletter</h4>
                        <p className="text-sm font-medium text-gray-500 mb-4">Don’t miss out on promo updates and free sticker drops every week!</p>
                        <div className="relative group">
                            <input
                                type="email"
                                placeholder="Your email..."
                                className="w-full px-4 py-3 bg-orange-50 border-2 border-orange-600 rounded-xl font-bold focus:outline-none shadow-[4px_4px_0px_0px_rgba(234,88,12,1)]"
                            />
                            <button className="mt-4 w-full bg-orange-600 text-white py-2 rounded-xl font-black uppercase text-xs tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all">
                                Subscribe 🚀
                            </button>
                        </div>
                    </div>

                </div>

                {/* --- Bottom Section: Payments & Copyright --- */}
                <div className="pt-10 border-t-2 border-dashed border-orange-200 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-wrap justify-center gap-4 grayscale opacity-60">
                        {/* Placeholder untuk Icon Pembayaran */}
                        <div className="bg-gray-100 border border-gray-300 px-3 py-1 rounded text-[10px] font-black italic uppercase">GoPay</div>
                        <div className="bg-gray-100 border border-gray-300 px-3 py-1 rounded text-[10px] font-black italic uppercase">OVO</div>
                        <div className="bg-gray-100 border border-gray-300 px-3 py-1 rounded text-[10px] font-black italic uppercase">BCA</div>
                        <div className="bg-gray-100 border border-gray-300 px-3 py-1 rounded text-[10px] font-black italic uppercase">PayPal</div>
                        <div className="bg-gray-100 border border-gray-300 px-3 py-1 rounded text-[10px] font-black italic uppercase">Visa</div>
                        <div className="bg-gray-100 border border-gray-300 px-3 py-1 rounded text-[10px] font-black italic uppercase">Master Card</div>
                    </div>

                    <div className="text-center md:text-right">
                        <p className="text-xs font-bold text-gray-400">
                            © 2024 <span className="text-orange-600 uppercase italic">PIXEL PRIGEL</span> — ALL RIGHTS RESERVED.
                        </p>
                        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-1">
                            Made with High Caffeine and Love in Indonesia
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}