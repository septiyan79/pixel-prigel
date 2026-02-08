import { useEffect } from "react";

export default function ProdCreateTitle({ form, setForm, handleChange }) {
    // HADLE SLUG ===========================================================
    const getBaseSlug = (title) => {
        return title
            .toLowerCase()
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .join("-")
            .replace(/[^a-z0-9-]/g, "");
    };

    const generatePrefix = () => {
        return Math.random()
            .toString(36)
            .substring(2, 6);
    };

    const generateSlug = (title) => {
        const base = getBaseSlug(title);
        const prefix = generatePrefix();
        return `${base}-digital-sticker-${prefix}`
    }

    useEffect(() => {
        if (!form.title) return;

        setForm(prev => ({
            ...prev,
            slug: generateSlug(prev.title)
        }));
    }, [form.title, setForm]);

    return (
        <>
            <div className="lg:col-span-12 space-y-6">
                <div className="bg-white border-2 border-black p-8 rounded-[2.5rem] shadow-[8px_8px_0px_0px_rgba(234,88,12,1)] space-y-6">
                    {/* Title Section */}
                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Product Title</label>
                            <input
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                type="text"
                                placeholder="e.g. Cyberpunk Sticker Pack"
                                className="w-full bg-white border-2 border-black p-4 rounded-xl font-bold text-base focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:-translate-y-1 transition-all outline-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Slug URL</label>
                                <input
                                    name="slug"
                                    value={form.slug}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="cyberpunk-pack"
                                    className="w-full bg-orange-50/50 border-2 border-black p-3 rounded-xl font-bold text-xs focus:bg-white outline-none"
                                    disabled
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Category</label>
                                <select
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                    className="w-full bg-white border-2 border-black p-3 rounded-xl font-bold text-xs outline-none appearance-none"
                                >
                                    <option value="">Select Category</option>
                                    <option value="cute animation">Cute Animation</option>
                                    <option value="anime">Anime</option>
                                    <option value="movie">Movie</option>
                                    <option value="funny">Funny</option>
                                </select>
                            </div>
                        </div>
                    </div>
                
                    {/* Description */}
                    <div>
                        <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Story & Details</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Describe your masterpiece..."
                            className="w-full bg-white border-2 border-black p-4 rounded-xl font-medium text-sm focus:bg-yellow-50/30 transition-colors outline-none leading-relaxed"
                        ></textarea>
                    </div>

                    {/* Pricing & Integration */}
                    <div className="grid grid-cols-2 gap-4 border-t-2 border-black/5 pt-6">
                        <div>
                            <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Price (IDR)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-xs text-orange-600">Rp</span>
                                <input
                                    type="number"
                                    name="priceIDR"
                                    value={form.priceIDR}
                                    onChange={handleChange}
                                    className="w-full bg-white border-2 border-black p-3 pl-12 rounded-xl font-black text-sm outline-none"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Price (USD)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-xs text-orange-600">$</span>
                                <input
                                    type="number"
                                    name="priceUSD"
                                    value={form.priceUSD}
                                    onChange={handleChange}
                                    className="w-full bg-white border-2 border-black p-3 pl-12 rounded-xl font-black text-sm outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Lynk.id Link</label>
                        <input
                            name="lynkid"
                            value={form.lynkid}
                            onChange={handleChange}
                            type="text"
                            placeholder="lynk.id/yourname"
                            className="w-full bg-white border-2 border-black p-3 rounded-xl font-bold text-xs outline-none"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}