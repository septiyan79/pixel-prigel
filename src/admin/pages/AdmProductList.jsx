import { useState, useEffect } from "react";

import { formatCurrency } from "../../utils/currency";
import { getStickers } from '../../data/listSticker';
import { NavLink } from "react-router-dom";

import { GoChevronLeft, GoChevronRight } from "react-icons/go";

export default function AdmProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getStickers().then(setProducts);
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // logika pemotongan data
    const indexOflastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOflastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOflastItem);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    // --- Logika Baru: Membatasi Tombol Angka (Max 5) ---
    const getPageNumbers = () => {
        const maxPageButtons = 5; // Batas tombol yang tampil
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

        // Penyesuaian jika di akhir halaman agar tetap tampil 5 tombol
        if (endPage - startPage < maxPageButtons - 1) {
            startPage = Math.max(1, endPage - maxPageButtons + 1);
        }

        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <h2 className="uppercase font-bold tracking-wider text-sm">List of Product</h2>
                <NavLink to="/admin/product/create"
                    className="px-6 py-2 bg-orange-600 text-white border-2 border-black rounded-xl font-black text-[11px] uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-0.5 transition-all">
                    Create New
                </NavLink>
            </div>

            <div className="bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                {/* <pre>{JSON.stringify(products, null, 2)}</pre> */}

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
                        {currentItems.map((p) => (
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
                                    <NavLink
                                        to={`/admin/product/${p.slug}`}
                                        className="bg-white border border-black px-2 py-1 rounded text-[9px] font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1px hover:shadow-none transition-all"
                                    >View Detail</NavLink>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-center gap-2 mt-8 pb-10">

                {/* Tombol PREV - Sekarang lebih compact (Icon Only) */}
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`w-9 h-9 flex items-center justify-center bg-white border-2 border-black rounded-lg transition-all
      ${currentPage === 1
                            ? 'opacity-30 cursor-not-allowed'
                            : 'shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-px hover:translate-y-px active:bg-orange-50'
                        }`}
                >
                    <GoChevronLeft className="text-lg" />
                </button>

                {/* DAFTAR NOMOR HALAMAN */}
                <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-9 h-9 flex items-center justify-center border-2 border-black rounded-lg font-black text-xs transition-all
          ${currentPage === page
                                    ? 'bg-orange-500 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] scale-110 z-10'
                                    : 'bg-white text-black hover:bg-orange-50 hover:border-orange-500'
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                {/* Tombol NEXT - Icon Only */}
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`w-9 h-9 flex items-center justify-center bg-white border-2 border-black rounded-lg transition-all
      ${currentPage === totalPages
                            ? 'opacity-30 cursor-not-allowed'
                            : 'shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-px hover:translate-y-px active:bg-orange-50'
                        }`}
                >
                    <GoChevronRight className="text-lg" />
                </button>




                {/* 2. Navigasi Pagination */}
                <div className="pagination-controls" style={{ marginTop: '20px', display: 'flex', gap: '5px' }}>

                    {/* Tombol ke Halaman Pertama */}
                    <button
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                    >
                        First
                    </button>

                    {/* Render Tombol Angka yang sudah dibatasi */}
                    {getPageNumbers().map(number => (
                        <button
                            key={number}
                            onClick={() => setCurrentPage(number)}
                            style={{
                                padding: '5px 10px',
                                backgroundColor: currentPage === number ? 'blue' : 'white',
                                color: currentPage === number ? 'white' : 'black',
                                border: '1px solid #ccc',
                                cursor: 'pointer'
                            }}
                        >
                            {number}
                        </button>
                    ))}

                    {/* Tombol ke Halaman Terakhir */}
                    <button
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                    >
                        Last
                    </button>

                </div>

            </div>
        </>
    );
}