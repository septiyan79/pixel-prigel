import { useState, useEffect } from "react";

import { formatCurrency } from "../../utils/currency";
import { getStickers } from '../../data/listSticker';
import { NavLink } from "react-router-dom";

import { GoChevronLeft, GoChevronRight } from "react-icons/go";

export default function AdmProductList() {
    const [products, setProducts] = useState([]);

    const [activeTab, setActiveTab] = useState('all');

    const tabs = [
        { id: 'all', label: 'All Products', count: 12 },
        { id: 'active', label: 'Active', count: 8 },
        { id: 'draft', label: 'Drafts', count: 4 },
    ];

    useEffect(() => {
        const mapStatus = {
            all: "all",
            active: "active",
            draft: "inactive",
        };

        setCurrentPage(1);

        getStickers({ activeStatus: mapStatus[activeTab] })
            .then(setProducts);
    }, [activeTab]);


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // logika pemotongan data
    const indexOflastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOflastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOflastItem);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    // --- Logika Baru: Membatasi Tombol Angka (Max 5) ---
    const getPageNumbers = () => {
        const maxPageButtons = 3; // Batas tombol yang tampil
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

            <div className="flex flex-wrap gap-3 border-b-4 border-orange-50 pb-4 mb-3">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                            relative px-6 py-3 rounded-xl font-black uppercase text-xs transition-all
                            border-2 border-black
                            ${isActive
                                    ? 'bg-orange-600 text-white translate-x-0.5 translate-y-0.5 shadow-none'
                                    : 'bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                }
                            `}
                        >
                            <div className="flex items-center gap-2">
                                <span>{tab.label}</span>
                                <span className={`
                                            px-1.5 py-0.5 rounded text-[10px] 
                                            ${isActive ? 'bg-white text-orange-600' : 'bg-black text-white'}
                                `}>
                                    {tab.count}
                                </span>
                            </div>
                        </button>
                    );
                })}
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
                <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                >
                    First
                </button>

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
                    {getPageNumbers().map(number => (
                        <button
                            key={number}
                            onClick={() => setCurrentPage(number)}
                            className={`w-9 h-9 flex items-center justify-center border-2 border-black rounded-lg font-black text-xs transition-all
                                    ${currentPage === number
                                    ? 'bg-orange-500 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] scale-110 z-10'
                                    : 'bg-white text-black hover:bg-orange-50 hover:border-orange-500'
                                }`}
                        >
                            {number}
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

                <button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                >
                    Last
                </button>


            </div>

        </>
    );
}