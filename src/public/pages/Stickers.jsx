import { useEffect, useState } from "react";
import { getStickers } from "../../data/listSticker";

import { Link } from "react-router-dom";

const Stickers = () => {
    const [products, setProducts] = useState([]);
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        getStickers().then(setProducts);
    }, []);

    // if (loading) return <p>Loading stickers...</p>;

    return (
        <>
            {/* --- Main Content --- */}
            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">

                {/* Header & Filter Section */}
                <section className="mb-16">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="max-w-xl">
                            <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">
                                The <span className="text-orange-600">Sticker</span> Archive
                            </h1>
                            <p className="font-medium text-gray-500">Discover hundreds of premium, ready-to-use digital sticker designs to power all your creative ideas.</p>
                        </div>

                        {/* Search Bar */}
                        <div className="relative group w-full md:w-80">
                            <input
                                type="text"
                                placeholder="Look for sticker..."
                                className="w-full px-6 py-4 bg-white border-2 border-orange-600 rounded-2xl font-bold shadow-[4px_4px_0px_0px_rgba(234,88,12,1)] focus:outline-none focus:translate-x-1 focus:translate-y-1 focus:shadow-none transition-all"
                            />
                            <span className="absolute right-5 top-4 text-orange-600 font-bold">🔍</span>
                        </div>
                    </div>

                    {/* Categories Scrollable */}
                    {/* <div className="flex gap-3 mt-10 overflow-x-auto pb-4 no-scrollbar">
                        {categories.map((cat, i) => (
                            <button
                                key={i}
                                className={`whitespace-nowrap px-6 py-2 rounded-xl font-black text-sm uppercase tracking-tight border-2 border-orange-600 transition-all shadow-[3px_3px_0px_0px_rgba(234,88,12,1)] hover:translate-x-2px hover:translate-y-2px hover:shadow-none ${i === 0 ? 'bg-orange-600 text-white' : 'bg-white text-orange-600'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div> */}
                </section>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {products.map(product => (
                        <div key={product.id} className="group relative">
                            {/* Box Shadow Backgroud */}
                            <div className="absolute inset-0 bg-orange-600 rounded-[2.5rem] translate-x-1 translate-y-1 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-300"></div>

                            <div className="relative bg-white border-2 border-orange-600 rounded-[2.5rem] p-4 flex flex-col h-full overflow-hidden">
                                {/* Square Image */}
                                <div className={`aspect-square rounded-[1.8rem] bg-orange-100 mb-5 flex items-center justify-center border-2 border-orange-50 relative overflow-hidden`}>
                                    <img
                                        src={product.coverImage}
                                        alt={product.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 p-8"
                                    />
                                    {/* Category Badge */}
                                    <div className="absolute top-4 right-4 bg-white border-2 border-orange-600 px-3 py-1 rounded-full text-[10px] font-black uppercase text-orange-600">
                                        {product.category}
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="flex flex-col grow px-2 pb-2">
                                    <h3 className="text-2xl font-black leading-none mb-2 uppercase italic tracking-tighter">{product.title}</h3>
                                    <p className="text-sm text-gray-500 font-medium mb-4 line-clamp-2">
                                        Koleksi sticker {product.category} berkualitas tinggi format PNG & SVG.
                                    </p>

                                    <div className="mt-auto">
                                        <div className="text-xl font-black text-orange-600 mb-4 tracking-tight">
                                            Rp {product.price.IDR.toLocaleString("id-ID")}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-col gap-2">
                                            <button className="w-full py-3 bg-orange-600 text-white rounded-2xl font-black text-sm uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all">
                                                Buy Now
                                            </button>
                                            <button className="w-full py-2 bg-transparent text-gray-400 rounded-xl font-bold text-xs uppercase hover:text-orange-600 transition">
                                                <Link to={`/stickers/${product.id}`}>View Details</Link>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-20 flex justify-center gap-4">
                    <button className="w-12 h-12 bg-white border-2 border-orange-600 rounded-xl font-black shadow-[4px_4px_0px_0px_rgba(234,88,12,1)] hover:shadow-none transition-all">1</button>
                    <button className="w-12 h-12 bg-white border-2 border-gray-200 rounded-xl font-black text-gray-400 hover:border-orange-600 hover:text-orange-600 transition-all">2</button>
                    <button className="w-12 h-12 bg-white border-2 border-gray-200 rounded-xl font-black text-gray-400 hover:border-orange-600 hover:text-orange-600 transition-all">3</button>
                </div>
            </main>
        </>
    );
};

export default Stickers;