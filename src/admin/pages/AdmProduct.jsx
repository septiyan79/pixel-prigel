import { useEffect, useState } from 'react';
import { getStickers } from '../../data/listSticker';

const AdmProduct = () => {
    const [view, setView] = useState('list'); // 'list' or 'detail'
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getStickers().then(setProducts);
    }, []);

    const handleOpenDetail = (product) => {
        setSelectedProduct(product);
        setView('detail');
    };

    return (
        <>
            {view === 'list' ? (
                /* --- PRODUCT LIST (TABLE) --- */
                <div className="bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-orange-50 border-b-2 border-black">
                            <tr>
                                <th className="p-3 text-[10px] font-black uppercase italic tracking-widest border-r-2 border-black">Cover</th>
                                <th className="p-3 text-[10px] font-black uppercase italic tracking-widest border-r-2 border-black">Product Name</th>
                                <th className="p-3 text-[10px] font-black uppercase italic tracking-widest border-r-2 border-black">Category</th>
                                <th className="p-3 text-[10px] font-black uppercase italic tracking-widest border-r-2 border-black">Price</th>
                                <th className="p-3 text-[10px] font-black uppercase italic tracking-widest text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y-2 divide-black/5">
                            {products.map((p) => (
                                <tr key={p.id} className="hover:bg-orange-50/30 transition-colors">
                                    <td className="p-3 border-r-2 border-black/5">
                                        <img src={p.cover} className="w-10 h-10 rounded-lg border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] object-cover" />
                                    </td>
                                    <td className="p-3 border-r-2 border-black/5">
                                        <p className="font-black text-xs uppercase">{p.title}</p>
                                        <p className="text-[9px] font-bold text-gray-400">{p.slug}</p>
                                    </td>
                                    <td className="p-3 border-r-2 border-black/5">
                                        <span className="text-[9px] font-black px-2 py-0.5 bg-yellow-100 border border-black rounded-full">{p.category}</span>
                                    </td>
                                    <td className="p-3 border-r-2 border-black/5 font-black text-xs">Rp {p.price.IDR}</td>
                                    <td className="p-3 text-center">
                                        <button
                                            onClick={() => handleOpenDetail(p)}
                                            className="bg-white border border-black px-2 py-1 rounded text-[9px] font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1px hover:shadow-none transition-all"
                                        >View Detail</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                /* --- PRODUCT DETAIL VIEW --- */
                <div className="space-y-6">
                    <button
                        onClick={() => setView('list')}
                        className="mb-2 text-[10px] font-black uppercase flex items-center gap-1 hover:text-orange-600"
                    >
                        ← Back to List
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                        {/* Left: Images Column */}
                        <div className="lg:col-span-4 space-y-4">
                            <div className="bg-white border-2 border-black p-2 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <p className="text-[9px] font-black uppercase mb-2 text-gray-400">Main Cover</p>
                                <img src={selectedProduct.coverImage} className="w-full aspect-square object-cover rounded-lg border border-black" />
                            </div>

                            <div className="bg-white border-2 border-black p-3 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <p className="text-[9px] font-black uppercase mb-3 text-gray-400">Gallery Photos</p>
                                <div className="grid grid-cols-3 gap-2">
                                    {selectedProduct.galleryImages.map((img, i) => (
                                        <img key={i} src={img} className="w-full aspect-square object-cover rounded border border-black" />
                                    ))}
                                    <div className="border-2 border-dashed border-gray-200 rounded flex items-center justify-center text-xs text-gray-300 font-black">+</div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Info Column */}
                        <div className="lg:col-span-8 space-y-4">
                            <div className="bg-white border-2 border-black p-6 rounded-2xl shadow-[4px_4px_0px_0px_rgba(234,88,12,1)]">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className="text-[9px] font-black uppercase bg-orange-600 text-white px-2 py-0.5 rounded italic">Digital Product</span>
                                        <h1 className="text-2xl font-black uppercase italic tracking-tighter mt-1">{selectedProduct.title}</h1>
                                    </div>
                                    <p className="text-xl font-black text-orange-600">Rp {selectedProduct.price.IDR}</p>
                                </div>

                                <div className="mb-6">
                                    <p className="text-[10px] font-black uppercase text-gray-400 mb-1 italic underline decoration-yellow-400">
                                        Description
                                    </p>

                                    <div className="text-s font-medium leading-relaxed text-gray-600">
                                        {selectedProduct.description
                                            .split("\n\n")
                                            .map((paragraph, index) => (
                                                <p
                                                    key={index}
                                                    className="mb-3 leading-snug"
                                                >
                                                    {paragraph}
                                                </p>
                                            ))}
                                    </div>
                                </div>


                                {/* Digital File Section */}
                                <div className="bg-orange-50 border-2 border-dashed border-orange-300 p-4 rounded-xl flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white border border-black rounded flex items-center justify-center text-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">📄</div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase leading-none">Attached File (PDF)</p>
                                            <p className="text-[9px] font-bold text-orange-600">{"selectedProduct.file"}</p>
                                        </div>
                                    </div>
                                    <button className="bg-white border border-black px-3 py-1.5 rounded-lg text-[9px] font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Download Sample</button>
                                </div>
                            </div>

                            {/* Actions Area */}
                            <div className="flex gap-3">
                                <button className="flex-1 bg-black text-white py-3 rounded-xl font-black uppercase text-xs shadow-[4px_4px_0px_0px_rgba(234,88,12,1)] active:shadow-none active:translate-y-1 transition-all">Edit Product Info</button>
                                <button className="px-6 bg-red-100 border-2 border-black text-red-600 py-3 rounded-xl font-black uppercase text-xs">Delete</button>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
};

export default AdmProduct;
