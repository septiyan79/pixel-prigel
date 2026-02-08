import { GoPlus, GoCloud, GoFileDirectory } from "react-icons/go";

export default function ProdCreateAssets() {
    return (
        <>
            <div className="lg:col-span-5 space-y-6 ">
                {/* Main Cover */}
                <div className="bg-white border-2 border-black p-5 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <h3 className="text-[11px] font-black uppercase mb-4 flex items-center gap-2">
                        <span className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-[10px]">1</span>
                        Primary Cover Image
                    </h3>
                    <div className="aspect-square bg-orange-50 border-2 border-dashed border-orange-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-orange-100/50 hover:border-orange-500 transition-all group relative overflow-hidden">
                        <GoCloud className="text-4xl text-orange-400 group-hover:scale-110 group-hover:text-orange-600 transition-all" />
                        <p className="text-[10px] font-black uppercase mt-3">Click to Upload Cover</p>
                        <p className="text-[9px] font-bold text-gray-400 mt-1">Min. 1080 x 1080 px</p>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
                {/* Gallery */}
                <div className="bg-white border-2 border-black p-5 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <h3 className="text-[11px] font-black uppercase mb-4 flex items-center gap-2 text-gray-400">
                        <span className="w-5 h-5 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-[10px]">2</span>
                        Gallery Showcase
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="aspect-square bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-300 hover:border-black hover:text-black transition-all cursor-pointer group">
                                <GoPlus className="text-2xl group-hover:rotate-90 transition-transform" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Digital Asset Dropzone */}
                <div className="bg-white border-2 border-black p-5 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <h3 className="text-[11px] font-black uppercase mb-4 flex items-center gap-2 text-gray-400">
                        <span className="w-5 h-5 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-[10px]">3</span>
                        Source File (PDF/ZIP)
                    </h3>
                    <div className="bg-orange-500 border-2 border-black p-4 rounded-2xl flex items-center justify-between group cursor-pointer hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-1 active:shadow-none">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white border-2 border-black rounded-xl flex items-center justify-center text-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                <GoFileDirectory />
                            </div>
                            <div>
                                <p className="text-white text-[10px] font-black uppercase tracking-widest leading-none">Drop Digital Asset</p>
                                <p className="text-orange-200 text-[9px] font-bold mt-1 uppercase">Stickers.zip / PDF allowed</p>
                            </div>
                        </div>
                        <span className="text-white text-xs mr-2">→</span>
                    </div>
                </div>
            </div>
        </>
    );
}