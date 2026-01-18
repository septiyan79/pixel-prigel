import { Link } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function OurStory() {
    const values = [
        { title: "High Quality", desc: "Setiap pixel dipoles dengan cinta agar tajam di semua layar.", icon: "✨" },
        { title: "Made by creators, for creators", desc: "Every sticker is designed to be actually used — not just displayed.", icon: "🎨" },
        { title: "Print-ready & flexible-Digital", desc: "Perfect for DIY printing, physical sticker sales, or digital content.", icon: "🖨️" },
        { title: "One pack, endless possibilities", desc: "Use it for personal projects, branding, or commercial needs with ease.", icon: "📦" },
        { title: "Bold designs, not generic templates", desc: "Playful, expressive, and full of character.", icon: "✨" },
        { title: "Focus on creating", desc: "We handle the assets, you bring the ideas to life.", icon: "🚀" },
    ];


    return (
        <div className="min-h-screen bg-[#FFFBF7] text-gray-900 selection:bg-orange-200">
            {/* --- Floating Navbar (Consistent with V2) --- */}
            <Navbar />

            {/* --- Hero Section --- */}
            <header className="pt-40 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center relative">
                    {/* Decorative Badge */}
                    <div className="inline-block bg-yellow-300 border-2 border-orange-600 px-4 py-1 rounded-full font-black text-sm uppercase rotate-3 mb-6 shadow-[3px_3px_0px_0px_rgba(234,88,12,1)]">
                        Meet the Makers! ✌️
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black leading-none mb-8 tracking-tighter">
                        WE CREATE <span className="text-orange-600 italic">STICKY</span> <br />
                        MEMORIES.
                    </h1>

                    <p className="text-xl md:text-2xl font-medium text-gray-700 max-w-2xl mx-auto leading-relaxed">
                        What started as simple tablet doodles became Pixel Prigel — here to help you create, explore, and add color to your creative world.
                    </p>
                </div>
            </header>

            {/* --- Story Section --- */}
            <section className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Image Side */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-black rounded-[2rem] rotate-3 group-hover:rotate-0 transition-transform duration-300"></div>
                        <div className="relative bg-orange-100 border-2 border-orange-600 rounded-[2rem] aspect-[4/3] flex items-center justify-center overflow-hidden">
                            <img
                                src="../../public/pxp-bg.png"
                                alt="Creative Workspace"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Overlay Sticker Effect */}
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white border-2 border-orange-600 rounded-full flex items-center justify-center p-4 shadow-xl -rotate-12 animate-bounce">
                            <span className="text-orange-600 font-black text-center text-xs">HIGH QUALITY FILES</span>
                        </div>
                    </div>

                    {/* Text Side */}
                    <div className="space-y-6">
                        <h2 className="text-4xl font-black uppercase italic tracking-tight">Kenapa Harus Stikko?</h2>
                        <p className="text-lg text-gray-600 font-medium leading-relaxed">
                            We believe creativity doesn’t have to be hard, and we’re here to help make your creative process easier and more enjoyable.
                        </p>
                        <div className="space-y-4">
                            {values.map((v, i) => (
                                <div key={i} className="flex gap-4 items-start p-4 bg-white border-2 border-orange-600 rounded-2xl shadow-[4px_4px_0px_0px_rgba(234,88,12,1)]">
                                    <span className="text-3xl">{v.icon}</span>
                                    <div>
                                        <h4 className="font-black uppercase text-orange-600">{v.title}</h4>
                                        <p className="text-sm font-medium text-gray-500">{v.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Fun Stats Section --- */}
            <section className="bg-orange-600 my-20 py-16 -rotate-1 w-full overflow-hidden">
                <div className="flex flex-wrap justify-around gap-8 px-6 rotate-1">
                    <div className="text-center text-white">
                        <div className="text-6xl font-black italic">500+</div>
                        <div className="font-bold uppercase tracking-widest text-orange-200">Stickers Made</div>
                    </div>
                    <div className="text-center text-white">
                        <div className="text-6xl font-black italic">12K+</div>
                        <div className="font-bold uppercase tracking-widest text-orange-200">Happy Users</div>
                    </div>
                    <div className="text-center text-white">
                        <div className="text-6xl font-black italic">100%</div>
                        <div className="font-bold uppercase tracking-widest text-orange-200">Digital Love</div>
                    </div>
                </div>
            </section>

            {/* --- Call to Action --- */}
            <section className="max-w-4xl mx-auto px-6 text-center py-20">
                <div className="bg-white border-4 border-dashed border-orange-300 p-12 rounded-[3rem]">
                    <h2 className="text-3xl font-black mb-6 uppercase">Ready to bring your screen to life?</h2>
                    <p className="mb-8 font-medium text-gray-500 italic">Starting at <b className='text-orange-600'> $3.99</b>, discover adorable and cool sticker collections made to boost your creativity.</p>
                    <Link to={"/stickers"} className="bg-orange-600 text-white px-10 py-4 rounded-2xl font-black text-xl uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                        Go grab yours! {/* Gaskeun Ke Toko! */}
                    </Link>
                </div>
            </section>

            <p>
                <Footer />
            </p>
        </div>
    );
}