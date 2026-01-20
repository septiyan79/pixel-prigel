import { useEffect, useState } from "react";
import { getStickers } from "../../data/listSticker";

import { Link } from "react-router-dom";

export default function Recomendation() {
    const [products, setProducts] = useState([]);
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        getStickers({ limit: 4 }).then(setProducts);
    }, []);

    // if (loading) return <p>Loading stickers...</p>;

    return (
        <section className="mt-32">
            <h2 className="text-3xl font-black uppercase italic mb-10 tracking-tighter">You Might Also <span className="text-orange-600">Love...</span></h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 opacity-80">
                {products.map(i => (
                    <Link key={i.id} to={`/stickers/${i.id}`}>
                        <div className="bg-white border-2 border-black p-3 rounded-2xl hover:rotate-2 transition-transform cursor-pointer shadow-[4px_4px_0px_0px_rgba(234,88,12,1)]">
                            <div className="aspect-square bg-orange-100 rounded-xl mb-3 overflow-hidden">
                                <img src={i.coverImage} alt="Related" className="w-full h-full object-cover" />
                            </div>
                            <div className="font-black text-xs uppercase truncate">{i.title}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}