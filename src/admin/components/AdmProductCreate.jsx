import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/firestore";

export default function AdmProductCreate({ handleViewButton }) {
    const [form, setForm] = useState({
        title: "",
        slug: "",
        category: "",
        description: "",
        priceIDR: "",
        coverImage: "",
        galleryImages: [],
        tags: [],
        lynkid: "",
        active: false,
    });

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
            await addDoc(collection(db, "products"), {
                title: form.title,
                slug: form.slug,
                category: form.category,
                description: form.description,
                type: "digital",
                license: "personal",

                price: {
                    IDR: Number(form.priceIDR),
                },

                coverImage: form.coverImage,
                galleryImages: form.galleryImages,
                tags: form.tags,

                lynkid: form.lynkid,

                fileAsset: null, // 🔑 disiapkan dari sekarang

                active: form.active,

                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });

            alert("Product berhasil ditambahkan");
        } catch (err) {
            console.error(err);
            alert("Gagal menambahkan product");
        }
    };


    return (
        <div className="space-y-6 mx-auto p-4">
            {/* Header Navigation */}
            <button
                onClick={() => handleViewButton('list')}
                className="mb-2 text-[10px] font-black uppercase flex items-center gap-1 hover:text-orange-600 transition-colors"
            >
                ← Cancel & Go Back
            </button>

            <div className="flex flex-col gap-2 mb-4">
                <span className="text-[10px] font-black uppercase bg-black text-white px-2 py-0.5 w-fit italic">Admin Studio</span>
                <h1 className="text-3xl font-black uppercase italic tracking-tighter">Create New Product</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Side: Uploaders */}
                <div className="lg:col-span-5 space-y-6">
                    {/* Main Cover Upload */}
                    <div className="bg-white border-2 border-black p-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <p className="text-[10px] font-black uppercase mb-3 text-gray-400">1. Product Cover</p>
                        <div className="aspect-square bg-orange-50 border-2 border-dashed border-black rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-orange-100 transition-colors group">
                            <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">📸</span>
                            <p className="text-[10px] font-black uppercase">Upload Main Image</p>
                            <p className="text-[8px] text-gray-400 mt-1">Recommended: 1080x1080px</p>
                        </div>
                    </div>

                    {/* Gallery Upload */}
                    <div className="bg-white border-2 border-black p-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <p className="text-[10px] font-black uppercase mb-3 text-gray-400">2. Gallery Photos</p>
                        <div className="grid grid-cols-3 gap-3">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="aspect-square bg-gray-50 border border-black rounded-md flex items-center justify-center text-gray-300 hover:border-orange-500 cursor-pointer">
                                    <span className="font-black text-xl">+</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side: Form Details */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="bg-white border-2 border-black p-6 rounded-2xl shadow-[6px_6px_0px_0px_rgba(234,88,12,1)]">
                        <form className="space-y-5">
                            {/* Product Title */}
                            <div>
                                <label className="text-[10px] font-black uppercase text-gray-500 block mb-1 ml-1">Product Title</label>
                                <input
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="E.G. VINTAGE POSTER PACK"
                                    className="w-full bg-white border-2 border-black p-3 rounded-xl font-bold text-sm focus:outline-none focus:ring-2 ring-orange-400 placeholder:text-gray-300"
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-black uppercase text-gray-500 block mb-1 ml-1">Category</label>
                                <input
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="belum"
                                    className="w-full bg-white border-2 border-black p-3 rounded-xl font-bold text-sm focus:outline-none focus:ring-2 ring-orange-400 placeholder:text-gray-300"
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-black uppercase text-gray-500 block mb-1 ml-1">Slug</label>
                                <input
                                    name="slug"
                                    value={form.slug}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Slug (Unique)"
                                    className="w-full bg-white border-2 border-black p-3 rounded-xl font-bold text-sm focus:outline-none focus:ring-2 ring-orange-400 placeholder:text-gray-300"
                                />
                            </div>

                            {/* Price IDR */}
                            <div>
                                <label className="text-[10px] font-black uppercase text-gray-500 block mb-1 ml-1">Price (IDR)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-xs text-orange-600">Rp</span>
                                    <input
                                        type="number"
                                        name="priceIDR"
                                        placeholder="0"
                                        value={form.priceIDR}
                                        onChange={handleChange}
                                        className="w-full bg-white border-2 border-black p-3 pl-12 rounded-xl font-black text-sm focus:outline-none focus:ring-2 ring-orange-400"
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="text-[10px] font-black uppercase text-gray-500 block mb-1 ml-1 italic underline decoration-yellow-400">Description</label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Tell the story about this product..."
                                    className="w-full bg-white border-2 border-black p-3 rounded-xl font-medium text-sm focus:outline-none focus:ring-2 ring-orange-400 leading-snug"
                                ></textarea>
                            </div>

                            <div>
                                <label className="text-[10px] font-black uppercase text-gray-500 block mb-1 ml-1">Lynk.id</label>
                                <input
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="belum"
                                    className="w-full bg-white border-2 border-black p-3 rounded-xl font-bold text-sm focus:outline-none focus:ring-2 ring-orange-400 placeholder:text-gray-300"
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-black uppercase text-gray-500 block mb-1 ml-1">Cover Image (Cloudinary)</label>
                                <input
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="belum"
                                    className="w-full bg-white border-2 border-black p-3 rounded-xl font-bold text-sm focus:outline-none focus:ring-2 ring-orange-400 placeholder:text-gray-300"
                                />
                            </div>

                            {/* Digital File Upload Area */}
                            <div>
                                <label className="text-[10px] font-black uppercase text-gray-500 block mb-2 ml-1">Product Asset (ZIP/PDF)</label>
                                <div className="bg-orange-50 border-2 border-dashed border-orange-300 p-6 rounded-xl flex flex-col items-center justify-center gap-2">
                                    <div className="w-12 h-12 bg-white border-2 border-black rounded-lg flex items-center justify-center text-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">📁</div>
                                    <p className="text-[9px] font-black uppercase mt-2">Drop your digital file here</p>
                                    <button type="button" className="mt-1 bg-black text-white px-4 py-1.5 rounded-full text-[8px] font-black uppercase">Browse Files</button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Submit Actions */}
                    <div className="flex gap-4 pt-2">
                        <button className="flex-1 bg-orange-600 text-white py-4 rounded-xl font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all">
                            Publish Product
                        </button>
                        <button className="px-8 bg-white border-2 border-black py-4 rounded-xl font-black uppercase text-sm hover:bg-gray-50 transition-colors">
                            Save Draft
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};
