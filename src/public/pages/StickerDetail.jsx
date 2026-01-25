import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

import Recomendation from "../components/Recomendation";

const StickerDetail = () => {
    const { productId } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const [currentImage, setCurrentImage] = useState(0);

    //THUMBNAIL
    const thumbRefs = useRef([]);
    const thumbContainerRef = useRef(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const ref = doc(db, "products", productId);
                const snap = await getDoc(ref);

                if (!snap.exists()) {
                    setProduct(null);
                } else {
                    setProduct({
                        id: snap.id,
                        ...snap.data()
                    });
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    //RESET IMAGE
    useEffect(() => {
        setCurrentImage(0);
    }, [productId]);
    // end REDET IMAGE

    // IMAGE
    const images = product
        ? [product.coverImage, ...(product.galleryImages || [])]
        : [];

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    };
    // END IMAGE

    //THUMBNAIL auto scroll
    useEffect(() => {
        if (!images.length) return;

        const activeThumb = thumbRefs.current[currentImage];
        const container = thumbContainerRef.current;

        if (!activeThumb || !container) return;

        activeThumb.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest",
        });
    }, [currentImage, images.length]);
    // END THUMBNAIL

    if (loading) return <p>Loading product...</p>;
    if (!product) return <p>Product not found</p>;


    // Data dummy untuk satu produk spesifik
    const prodoct = {
        includes: [
            "50+ Unique Sticker Designs",
            "High-Resolution, 300 DPI PNG (Transparent)",
            "Cutting Layout PSD Ready to Use (A4 size)",
            "Cutting Layout PNG Ready to Use (A4 size)",
            "Cutting Layout Silhouette Ready to Use in 3 sizes (Small, Medium, Large), optimized for A4 paper",
            "Free Lifetime Access",
            "A PDF file with Google Drive link to easily access all files"
        ],
    };

    return (
        <>
            <main className="pt-32 px-6 py-20 max-w-6xl mx-auto">
                {/* Breadcrumb */}
                <div className="mb-8 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400">
                    <a href="#" className="hover:text-orange-600">Stickers</a>
                    <span>/</span>
                    <a href="#" className="hover:text-orange-600">{product.category}</a>
                    <span>/</span>
                    <span className="text-orange-600">{product.title}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 items-start">

                    {/* --- LEFT: Product Image --- */}
                    <div className="lg:col-span-6 xl:col-span-5 w-full">
                        <div className="relative group">
                            {/* Background decorative frame */}
                            <div className="absolute inset-0 bg-orange-600 rounded-[3rem] translate-x-2 translate-y-2"></div>

                            <div className="relative bg-white border-3 border-black rounded-[3rem] overflow-hidden aspect-square flex items-center justify-center p-8 shadow-xl">
                                <img
                                    src={images[currentImage]}
                                    alt={product.title}
                                    className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                                />

                                {/* Floating Badge on Image */}
                                <div className="absolute top-8 left-8 bg-yellow-300 border-2 border-black px-4 py-2 rounded-xl font-black text-sm -rotate-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                    BEST VALUE! 🔥
                                </div>
                            </div>
                        </div>

                        {/* --- Thumbnail Container --- */}
                        <div className="relative mt-10">

                            {/* Shadow Thumbnail */}
                            <div className="absolute inset-0 bg-orange-600 rounded-4xl translate-x-2 translate-y-2"></div>

                            {/* Box Thumbnail */}
                            <div className="relative bg-white border-3 border-black rounded-4xl px-6 py-4 flex items-center gap-4">

                                {/* Left Button */}
                                <button
                                    onClick={prevImage}
                                    className="w-9 h-9 bg-white border-2 border-black rounded-full font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-orange-100"
                                >
                                    ‹
                                </button>

                                {/* Thumbnails */}
                                <div
                                    ref={thumbContainerRef}
                                    className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar">

                                    {images.map((img, index) => (
                                        <button
                                            key={index}
                                            ref={(el) => (thumbRefs.current[index] = el)}
                                            onClick={() => setCurrentImage(index)}
                                            className={`w-20 h-20 rounded-xl border-2 transition-all shrink-0
                                            ${currentImage === index
                                                    ? "border-orange-600 scale-95"
                                                    : "border-black opacity-70 hover:opacity-100"
                                                }`}
                                        >
                                            <img
                                                src={img}
                                                alt={`Thumbnail ${index}`}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        </button>
                                    ))}
                                </div>

                                {/* Right Button */}
                                <button
                                    onClick={nextImage}
                                    className="w-9 h-9 bg-white border-2 border-black rounded-full font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-orange-100"
                                >
                                    ›
                                </button>

                            </div>
                        </div>

                    </div>

                    {/* --- RIGHT: Product Info --- */}
                    <div className="lg:col-span-6 xl:col-span-7 flex flex-col pt-4">
                        <div className="inline-block bg-orange-100 text-orange-600 border border-orange-200 px-3 py-1 rounded-lg font-black text-xs uppercase w-fit mb-4">
                            Digital Download
                        </div>

                        <h1 className="text-4xl md:text-4xl font-black uppercase italic tracking-tighter leading-none mb-4">
                            {product.title}
                        </h1>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex text-yellow-400 text-xl">
                                {"★".repeat(5)}
                            </div>
                            <span className="font-bold text-sm text-gray-500">({product.title} Quality)</span>
                        </div>

                        <div className="bg-white border-2 border-black p-6 rounded-2xl shadow-[6px_6px_0px_0px_rgba(234,88,12,1)] mb-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-orange-600 text-white px-4 py-1 font-black text-xs uppercase rounded-bl-xl">
                                Price
                            </div>
                            <div className="text-4xl font-black text-orange-600">
                                Rp {product.price.IDR.toLocaleString("id-ID")}
                            </div>
                        </div>

                        {product.description
                            .split("\n\n")
                            .map((paragraph, index) => (
                                <p key={index} className="text-lg font-medium text-gray-600 leading-relaxed mb-8">
                                    {paragraph}
                                </p>
                            ))
                        }
                        <p className="text-lg font-medium text-gray-600 leading-relaxed mb-8">
                            {/* {product.description} */}
                        </p>

                        {/* What's Inside Section */}
                        <div className="mb-10">
                            <h3 className="font-black uppercase tracking-tighter text-xl mb-4 italic underline decoration-orange-400">What's Inside</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {prodoct.includes.map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 font-bold text-sm text-gray-700">
                                        <span className="w-5 h-5 bg-green-400 border border-black rounded-full flex items-center justify-center text-[10px]">✔</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="flex-1 bg-orange-600 text-white py-5 rounded-2xl font-black text-xl uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-3">
                                <span>Buy</span>
                                {/* <span className="text-2xl">⚡</span> */}
                            </button>
                            {/* <button className="px-8 py-5 bg-white border-2 border-black rounded-2xl font-black text-xl uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all">
                                ❤
                            </button> */}
                        </div>

                        {/* Trust Badges */}
                        <div className="mt-8 pt-8 border-t-2 border-dashed border-orange-200 flex justify-between items-center opacity-60 grayscale">
                            <span className="text-[10px] font-black uppercase">Instant Delivery</span>
                            <span className="text-[10px] font-black uppercase">Secure Payment</span>
                            <span className="text-[10px] font-black uppercase">24/7 Support</span>
                        </div>
                    </div>
                </div>

                {/* --- Related Section (Small Preview) --- */}
                <Recomendation />

            </main>
        </>
    );
};

export default StickerDetail;
