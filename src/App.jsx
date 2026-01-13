import React from 'react';
import { useEffect, useRef } from 'react';

const App = () => {
  //HANDLE KURSOR ORANGE ======================================
  const cursorRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) {
        // Mengatur posisi kursor berdasarkan koordinat mouse
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    window.addEventListener('mousemove', moveCursor);

    // Membersihkan event listener saat komponen tidak lagi digunakan (unmount)
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);
  //END, HANDLE KURSOR ORANGE ======================================

  const stickers = [
    { id: 1, name: "Vaporwave Dream", tag: "Best Seller", price: 19000, color: "bg-orange-200" },
    { id: 2, name: "Office Satire", tag: "New", price: 12000, color: "bg-yellow-100" },
    { id: 3, name: "Daily Positivity", tag: "Limited", price: 22000, color: "bg-orange-100" },
    { id: 4, name: "Gamer Spirit", tag: "Hot", price: 15000, color: "bg-orange-300" },
  ];

  return (
    <div className="min-h-screen bg-[#FFFBF7] text-gray-900 selection:bg-orange-200">
      {/* --- Floating Navbar --- */}
      <div className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
        <nav className="bg-white/80 backdrop-blur-md border-2 border-orange-600 px-6 py-3 rounded-2xl flex items-center gap-8 shadow-[4px_4px_0px_0px_rgba(234,88,12,1)]">
          <span className="font-black text-xl tracking-tighter text-orange-600">Pixel Prigel</span>
          <div className="hidden md:flex gap-6 text-sm font-bold uppercase tracking-wider">
            <a href="#" className="hover:text-orange-600">Home</a>
            <a href="#" className="hover:text-orange-600">Stickers</a>
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

      {/* --- Hero Section --- */}
      <header className="pt-32 pb-16 px-6 text-center overflow-hidden relative">
        {/* Dekorasi Abstrak */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-orange-400 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-orange-300 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <span className="bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-orange-200">
            Digital Assets for Creators
          </span>
          <h1 className="text-6xl md:text-8xl font-black mt-6 leading-[0.9] tracking-tight">
            STICKERS THAT <br />
            <span className="text-transparent stroke-orange-600" style={{ WebkitTextStroke: '2px #ea580c' }}>REALLY STICK.</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl max-w-xl mx-auto font-medium text-gray-600">
            Instant digital sticker designs perfect for DIY, journaling, and creative businesses.
          </p>
        </div>
      </header>

      {/* --- Product Grid Section --- */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {stickers.map((item) => (
            <div key={item.id} className="group relative">
              {/* Background Dekoratif untuk Efek Hover */}
              <div className="absolute inset-0 bg-orange-600 rounded-3xl translate-x-0 translate-y-0 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-300"></div>

              <div className="relative bg-white border-2 border-orange-600 rounded-3xl p-4 flex flex-col h-full overflow-hidden">
                {/* Image Container (Persegi) */}
                <div className={`aspect-square rounded-2xl ${item.color} mb-4 flex items-center justify-center border-b-2 border-orange-100 relative overflow-hidden`}>
                  <img
                    src={`https://via.placeholder.com/400?text=${item.name.split(' ')[0]}`}
                    alt={item.name}
                    className="w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white border border-orange-600 px-2 py-1 rounded-md text-[10px] font-bold uppercase shadow-[2px_2px_0px_0px_rgba(234,88,12,1)]">
                    {item.tag}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col grow">
                  <h3 className="text-xl font-black leading-tight mb-2 uppercase italic">{item.name}</h3>
                  <p className="text-xs text-gray-500 font-medium mb-4 grow">
                    High resolution PNG & SVG files. Perfect for Notion, GoodNotes, and Social Media.
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-black text-orange-600">Rp {item.price.toLocaleString()}</span>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col gap-2">
                    <button className="w-full py-3 bg-orange-600 text-white rounded-xl font-black text-sm uppercase tracking-tighter hover:bg-orange-700 transition active:scale-95">
                      Checkout Now
                    </button>
                    <button className="w-full py-2 bg-transparent text-orange-600 rounded-xl font-bold text-xs uppercase hover:bg-orange-50 transition border border-transparent hover:border-orange-200">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto bg-orange-600 rounded-[3rem] p-12 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-4xl font-black mb-6 italic">JOIN THE STICKER CLUB!</h2>
            <p className="mb-8 font-medium opacity-90">Stay updated with the hottest promos and enjoy free sticker releases every week!</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input type="email" placeholder="Your email..." className="grow px-6 py-4 rounded-2xl text-gray-900 focus:outline-none" />
              <button className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-black transition">JOIN</button>
            </div>
          </div>
          {/* Aksesori Dekorasi */}
          <div className="absolute -top-10 -right-10 w-40 h-40 border-8 border-orange-400/30 rounded-full"></div>
        </div>
      </section>

      {/* --- FOOTER --- */}
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


      {/* --- KURSOR ORANGE --- */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-6 h-6 bg-orange-500 rounded-full pointer-events-none z-9999 transition-transform duration-75 ease-out -ml-3 -mt-3"
      />

    </div>
  );
};

export default App;


