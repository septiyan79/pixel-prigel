export default function Cta() {
    return (
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
    );
}