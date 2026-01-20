export default function Hero() {
    return (
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
    );
}