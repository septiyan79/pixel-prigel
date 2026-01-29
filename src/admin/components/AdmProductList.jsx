import { formatCurrency } from "../../utils/currency";

export default function AdmProductList({ products, handleOpenDetail, handleViewButton }) {
    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <h2 className="uppercase font-bold tracking-wider text-sm">List of Product</h2>
                <button onClick={() => handleViewButton('create')} className="flex items-center gap-3 px-3 py-2 rounded-lg border-2 transition-all cursor-pointer bg-orange-500 text-white border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    Create New
                </button>
            </div>

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
                                    <img src={p.coverImage} className="w-10 h-10 rounded-lg border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] object-cover" />
                                </td>
                                <td className="p-3 border-r-2 border-black/5">
                                    <p className="font-black text-xs uppercase">{p.title}</p>
                                    <p className="text-[9px] font-bold text-gray-400">{p.slug}</p>
                                </td>
                                <td className="p-3 border-r-2 border-black/5">
                                    <span className="text-[9px] font-black px-2 py-0.5 bg-yellow-100 border border-black rounded-full">{p.category}</span>
                                </td>
                                <td className="p-3 border-r-2 border-black/5 font-black text-xs">{formatCurrency(p.price.IDR)}</td>
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
        </>
    );
}