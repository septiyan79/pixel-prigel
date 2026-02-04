import { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { GoChevronLeft, GoPlus, GoCloud, GoFileDirectory } from "react-icons/go";
import { NavLink, useNavigate } from "react-router-dom";


export default function AdmProductCreate() {
    const initialForm = {
        title: "",
        slug: "",
        category: "",
        description: "",
        priceIDR: "",
        // coverImage: "",
        // galleryImages: [],
        // tags: [],
        lynkid: "",
        active: false,
    };

    const [form, setForm] = useState(initialForm);

    const navigate = useNavigate();

    // HADLE SLUG ===========================================================
    const getBaseSlug = (title) => {
        return title
            .toLowerCase()
            .trim()
            .split(/\s+/)
            .slice(0,2)
            .join("-")
            .replace(/[^a-z0-9-]/g, "");
    };

    const generatePrefix = () => {
        return Math.random()
            .toString(36)
            .substring(2,6);
    };

    const generateSlug = (title) => {
        const base = getBaseSlug(title);
        const prefix = generatePrefix();
        return `${base}-digital-sticker-${prefix}`
    }

    useEffect(() => {
        setForm(prev => ({
            ...prev,
            slug: generateSlug(prev.title)
        }));
    }, [form.title]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.title || !form.slug || !form.priceIDR) {
            alert("Title, slug, dan price wajib diisi");
            return;
        }

        try {
            const productRef = collection(db, "products");

            await addDoc(productRef, {
                title: form.title,
                slug: form.slug,
                category: form.category,
                description: form.description,

                type: "digital",
                license: "personal",

                price: {
                    IDR: Number(form.priceIDR),
                },

                coverImage: "na",
                galleryImages: [],
                fileAsset: null,

                lynkid: form.lynkid,
                tags: [],

                active: true,

                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });

            alert("Product berhasil ditambahkan");
            setForm(initialForm);
            navigate("/admin/product");

        } catch (err) {
            console.error(err);
            alert("Gagal menambahkan product");
        }
    };


    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit}>
                {/* --- TOP NAVIGATION --- */}
                <div className="flex items-center justify-between">
                    <NavLink
                        to="/admin/product/"
                        className="group mb-6 flex items-center gap-2 px-3 py-2 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                    >
                        <div className="flex items-center justify-center w-5 h-5 bg-orange-100 border border-black rounded-lg group-hover:bg-orange-500 group-hover:text-white transition-colors">
                            <GoChevronLeft />
                        </div>
                        <span className="font-black text-[10px] uppercase tracking-widest">Back to List</span>
                    </NavLink>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => setForm(prev => ({ ...prev, active: false }))}
                            className="px-6 py-2 bg-white border-2 border-black rounded-xl font-black text-[11px] uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-0.5 transition-all">
                            Save Draft
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-orange-600 text-white border-2 border-black rounded-xl font-black text-[11px] uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-0.5 transition-all"
                        >
                            Publish Now
                        </button>
                    </div>
                </div>

                <div className="mb-6">
                    {/* <span className="text-[10px] font-black uppercase bg-yellow-400 border border-black px-2 py-0.5 w-fit italic mb-2 block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    New Collection
                </span> */}
                    <h4 className="text-2xl font-black uppercase italic tracking-tighter leading-none">Create Product Asset</h4>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* --- LEFT SIDE: MEDIA & ASSETS --- */}
                    <div className="lg:col-span-5 space-y-8">
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
                    </div>

                    {/* --- RIGHT SIDE: PRODUCT INFORMATION --- */}
                    <div className="lg:col-span-7">
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
                                <label className="text-[10px] font-black uppercase text-gray-400 ml-1 italic underline decoration-yellow-400 decoration-2">Story & Details</label>
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

                            {/* Digital Asset Dropzone */}
                            <div className="pt-4">
                                <label className="text-[10px] font-black uppercase text-gray-400 ml-1 mb-2 block">Source File (PDF/ZIP)</label>
                                <div className="bg-orange-600 border-2 border-black p-4 rounded-2xl flex items-center justify-between group cursor-pointer hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-1 active:shadow-none">
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
                    </div>
                </div>
            </form>
        </div>
    );
};
