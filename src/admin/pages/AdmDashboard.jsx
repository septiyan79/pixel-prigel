import { useState } from 'react';
import AdmLayout from "../layouts/AdmLayout";

const AdmDashboard = () => {
    return (
        <AdmLayout pageTitle="Dashboard">
            {/* Welcome Card */}
            <div className="bg-yellow-300 border-2 border-black p-5 rounded-2xl shadow-[4px_4px_0px_0px_rgba(234,88,12,1)] mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-black uppercase italic leading-none mb-1">Status: Active 🚀</h1>
                    <p className="text-[11px] font-bold text-gray-700">Terdapat 5 pesanan baru yang belum diproses hari ini.</p>
                </div>
                <button className="bg-white border-2 border-black px-4 py-2 rounded-lg font-black uppercase text-[10px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all">
                    Update Stock
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white border-2 border-black p-4 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                        <p className="text-[9px] font-black uppercase text-gray-400 mb-1">Metric Card {i}</p>
                        <h3 className="text-xl font-black italic">1,234 <span className="text-[10px] text-green-500">+12%</span></h3>
                    </div>
                ))}
            </div>

            {/* Dummy Table Data (Banyak baris untuk tes scroll) */}
            <div className="bg-white border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="px-5 py-3 border-b-2 border-black bg-orange-50 font-black text-xs uppercase italic">
                    Transaction History
                </div>
                <div className="divide-y divide-black/10">
                    {[...Array(15)].map((_, i) => (
                        <div key={i} className="px-5 py-4 flex items-center justify-between hover:bg-orange-50/50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gray-100 rounded border border-black"></div>
                                <div>
                                    <p className="text-[11px] font-black">Transaction #STK-00{i + 1}</p>
                                    <p className="text-[9px] font-bold text-gray-400">Paid via Bank Transfer</p>
                                </div>
                            </div>
                            <span className="text-[10px] font-black px-2 py-1 bg-green-100 text-green-600 border border-green-600 rounded">SUCCESS</span>
                        </div>
                    ))}
                </div>
            </div>
        </AdmLayout>
    );
};

export default AdmDashboard;
