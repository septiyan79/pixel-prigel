import { useState, useEffect, useRef } from "react";
import { NavLink, useParams } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";

import { formatCurrency } from "../../utils/currency";
import { db } from "../../firebase/firebase";
import {
    collection,
    where,
    getDocs,
    query,
    doc,
    updateDoc
} from "firebase/firestore";

import { uploadToCloudinary } from "../services/cloudinary";
import ProdDetailLeft from "../components/ProdDetailLeft";


export default function AdmProductDetail() {
    const { slug } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    // EDIT TEXT
    const [editingText, setEditingText] = useState(null);
    const [draftText, setDraftText] = useState("");

    const coverInputRef = useRef(null);
    const [uploadingCover, setUploadingCover] = useState(false);

    // const galleryInputRef = useRef(null);
    // const [uploadingGallery, setUploadingGallery] = useState(false);

    const startEditText = (fieldPath, value) => {
        setEditingText(fieldPath);
        setDraftText(String(value)); // selalu string untuk input
    };

    const saveEditText = async () => {
        if (!editingText) return;

        let value = draftText;

        // jika nested price
        if (editingText.startsWith("price.")) {
            value = Number(draftText);
            if (isNaN(value)) {
                setEditingText(null);
                setDraftText("");
                return;
            }
        }

        // update firestore & state
        await updateProductField(editingText, value);

        setEditingText(null);
        setDraftText("");
    };

    const updateProductField = async (fieldPath, value) => {
        try {
            const productRef = doc(db, "products", product.id);

            // build object untuk updateDoc
            const updateObj = {};
            updateObj[fieldPath] = value;
            updateObj.updatedAt = new Date();

            await updateDoc(productRef, updateObj);

            // update state lokal
            setProduct(prev => {
                const newState = { ...prev };
                const keys = fieldPath.split(".");
                if (keys.length === 2) {
                    newState[keys[0]] = { ...newState[keys[0]], [keys[1]]: value };
                } else {
                    newState[fieldPath] = value;
                }
                return newState;
            });

        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const q = query(
                    collection(db, "products"),
                    where("slug", "==", slug)
                );
                const snap = await getDocs(q);

                if (snap.empty) {
                    setProduct(null);
                } else {
                    const docData = snap.docs[0];
                    setProduct({
                        id: docData.id,
                        ...docData.data()
                    });
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [slug]);

    // EDIT COVER ========================================================
    const handleCoverUpload = async (file) => {
        if (!file) return;

        try {
            setUploadingCover(true);

            const folder = `pixel-prigel/products/${product.slug}/cover`;

            const result = await uploadToCloudinary({
                file,
                folder,
            });

            const imageUrl = result.secure_url;

            await updateProductField("coverImage", {
                url: result.secure_url,
                public_id: result.public_id,
            });

        } catch (err) {
            console.error("Cover upload error:", err);
        } finally {
            setUploadingCover(false);
            if (coverInputRef.current) {
                coverInputRef.current.value = "";
            }
        }
    };
    // END | EDIT COVER ========================================================

    if (loading) return <p>Loading Product ... </p>;
    if (!product) return <p>Product not found.</p>;

    return (
        <div className="space-y-6">
            {uploadingCover && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg text-white text-xs font-bold">
                    Uploading...
                </div>
            )}
            <div className="flex items-center justify-between">
                <NavLink
                    to="/admin/product/"
                    className="group mb-6 flex items-center gap-2 px-3 py-2 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                >
                    {/* Ikon Panah dengan animasi geser */}
                    <div className="flex items-center justify-center w-5 h-5 bg-orange-300 border border-black rounded-md group-hover:bg-orange-500 group-hover:text-white transition-colors">
                        <FaAngleLeft />
                    </div>

                    <span className="font-black text-[10px] uppercase tracking-widest">Back to List</span>
                </NavLink>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Images Column */}
                <ProdDetailLeft
                    product={product}
                    uploadingCover={uploadingCover}
                    coverInputRef={coverInputRef}
                    handleCoverUpload={handleCoverUpload}
                />

                {/* Right: Info Column */}
                <div className="lg:col-span-8 space-y-4">
                    <div className="bg-white border-2 border-black p-6 rounded-2xl shadow-[4px_4px_0px_0px_rgba(234,88,12,1)]">
                        <div className="flex justify-between items-start mb-4 gap-4">
                            <div className="flex-1 min-w-0">
                                <span className="text-[9px] font-black uppercase bg-orange-600 text-white px-2 py-0.5 rounded italic inline-block">
                                    Digital Product
                                </span>

                                {editingText !== "title" ? (
                                    <h1
                                        className="text-2xl font-black uppercase italic tracking-tighter mt-1"
                                        onClick={() => startEditText("title", product.title)}
                                    >
                                        {product.title}
                                    </h1>
                                ) : (
                                    <textarea
                                        autoFocus
                                        value={draftText}
                                        onChange={(ev) => setDraftText(ev.target.value)}
                                        onBlur={saveEditText}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                saveEditText();
                                            }
                                            if (e.key === "Escape") {
                                                setEditingText(null);
                                                setDraftText("");
                                            }
                                        }}
                                        rows={1}
                                        spellCheck={false}
                                        className="w-full block box-border text-2xl font-black text-orange-400 uppercase italic tracking-tighter mt-1 outline-none bg-transparent resize-none overflow-hidden"
                                    />
                                )}

                                <div className="mb-2">
                                    {editingText !== "category" ? (
                                        <p
                                            className="text-[15px] font-black uppercase text-orange-700 mb-1 cursor-pointer"
                                            onClick={() => startEditText("category", product.category)}
                                        >
                                            {product.category}
                                        </p>
                                    ) : (
                                        <select
                                            autoFocus
                                            value={draftText}
                                            onChange={(e) => setDraftText(e.target.value)}
                                            onBlur={saveEditText}
                                            className="w-full text-[15px] font-black uppercase text-orange-400 outline-none bg-transparent border-b border-orange-400 px-2 py-1 cursor-pointer"
                                        >
                                            <option value="Cute Animation">Cute Animation</option>
                                            <option value="Anime">Anime</option>
                                            <option value="Movie">Movie</option>
                                            <option value="Funny">Funny</option>
                                        </select>
                                    )}
                                </div>

                            </div>

                            <div>
                                {editingText !== "price.IDR" ? (
                                    <p
                                        className="text-xl font-black text-orange-600 whitespace-nowrap cursor-text"
                                        onClick={() => startEditText("price.IDR", product.price.IDR)}
                                    >
                                        {formatCurrency(product.price.IDR)}
                                    </p>
                                ) : (
                                    <input
                                        autoFocus
                                        type="number"
                                        value={draftText}
                                        onChange={(e) => setDraftText(e.target.value)}
                                        onBlur={saveEditText}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") saveEditText();
                                            if (e.key === "Escape") {
                                                setEditingText(null);
                                                setDraftText("");
                                            }
                                        }}
                                        className="w-28 text-xl font-black text-orange-600 outline-none bg-transparent"
                                    />
                                )}
                            </div>

                            <div>
                                {editingText !== "price.USD" ? (
                                    <p
                                        className="text-xl font-black text-cyan-600 whitespace-nowrap cursor-text"
                                        onClick={() => startEditText("price.USD", product.price.USD)}
                                    >
                                        {formatCurrency(product.price.USD, "USD")}
                                    </p>
                                ) : (
                                    <input
                                        autoFocus
                                        type="number"
                                        value={draftText}
                                        onChange={(e) => setDraftText(e.target.value)}
                                        onBlur={saveEditText}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") saveEditText();
                                            if (e.key === "Escape") {
                                                setEditingText(null);
                                                setDraftText("");
                                            }
                                        }}
                                        className="w-28 text-xl font-black text-cyan-600 outline-none bg-transparent"
                                    />
                                )}
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="text-[10px] font-black uppercase text-gray-400 mb-1 italic underline decoration-yellow-400">
                                Description
                            </p>

                            {editingText !== "description" ? (
                                <div
                                    className="text-s font-medium leading-relaxed text-gray-600 whitespace-pre-line cursor-text"
                                    onClick={() => startEditText("description", product.description)}
                                >
                                    {product.description.split("\n\n").map((p, i) => (
                                        <p key={i} className="mb-3 leading-snug">{p}</p>
                                    ))}
                                </div>
                            ) : (
                                <textarea
                                    autoFocus
                                    value={draftText}
                                    onChange={(e) => setDraftText(e.target.value)}
                                    onBlur={saveEditText}
                                    onKeyDown={(e) => {
                                        if (e.key === "Escape") {
                                            setEditingText(null);
                                            setDraftText("");
                                        }
                                    }}
                                    rows={30}
                                    spellCheck={false}
                                    className="w-full block box-border text-s font-medium leading-relaxed text-orange-400 mt-1 outline-none bg-transparent resize-y overflow-hidden"
                                />
                            )}
                        </div>


                        {/* Asset Section */}
                        <div className="bg-orange-50 border-2 border-dashed border-orange-300 p-4 rounded-xl space-y-4">

                            <p className="text-[10px] font-black uppercase leading-none">
                                Digital Assets
                            </p>

                            {/* ASSET IMAGES */}
                            {product.fileAsset?.images?.length > 0 && (
                                <div className="flex gap-3 overflow-x-auto pb-2">
                                    {product.fileAsset.images.map((img, i) => (
                                        <div
                                            key={i}
                                            className="relative group shrink-0 h-40 border border-black rounded-lg overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-white"
                                        >
                                            <img
                                                src={img}
                                                className="h-full w-auto object-cover"
                                                alt={`asset-${i}`}
                                            />

                                            {/* Hover overlay */}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                                                <span className="bg-white px-3 py-1 text-[9px] font-black uppercase rounded shadow">
                                                    Preview
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* EMPTY STATE */}
                            {(!product.fileAsset?.images?.length && !product.fileAsset?.driveLink) && (
                                <p className="text-[9px] text-gray-400 font-semibold">
                                    No assets uploaded yet.
                                </p>
                            )}
                        </div>

                    </div>

                </div>

            </div>
        </div >
    );
}