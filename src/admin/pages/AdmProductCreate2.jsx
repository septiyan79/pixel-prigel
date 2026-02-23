import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";

import { uploadToCloudinary } from "../services/cloudinary";

import ProdCreateHeader from "../components/ProdCreateHeader";
import ProdCreateAssets from "../components/ProdCreateAssets";

export default function AdmProductCreate2() {
    const { docId } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const [coverFile, setCoverFile] = useState(null);
    const [galleryFiles, setGalleryFiles] = useState([]);
    const [assetFile, setAssetFile] = useState(null);

    //AMBIL DATA PRODUCT ===================================================
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const docRef = doc(db, "products", docId);
                const snap = await getDoc(docRef);

                if (!snap.exists()) {
                    navigate("/admin/product");
                    return;
                }

                const data = snap.data();

                // cegah akses kalau sudah publish
                if (data.active) {
                    navigate("/admin/product");
                    return;
                }

                setProduct({
                    id: snap.id,
                    ...data,
                });

            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [docId, navigate]);

    if (loading) return <p>Loading Product ... </p>;
    if (!product) return <p>Product not found.</p>;
    //END, AMBIL DATA PRODUCT ===================================================

    //SUBMIT KE CLOUDINARY DAN UPDATE FIRESTORE ===================================================
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;

        if (!coverFile || !assetFile) {
            alert("Cover dan File Asset wajib diupload");
            return;
        }

        setLoading(true);

        try {
            const baseFolder = `pixel-prigel/products/${product.slug}`;

            // 1️⃣ upload cover
            const coverRes = await uploadToCloudinary(
                coverFile,
                `${baseFolder}/cover`
            );

            const coverUrl = coverRes.secure_url;

            // 2️⃣ upload gallery (parallel)
            const galleryUploads = galleryFiles.map((file) =>
                uploadToCloudinary(file, `${baseFolder}/gallery`)
            );

            const galleryResults = await Promise.all(galleryUploads);

            const galleryUrls = galleryResults.map((r) => r.secure_url);

            // 3️⃣ upload asset file
            const assetRes = await uploadToCloudinary(
                assetFile,
                `${baseFolder}/asset`
            );

            const assetData = {
                url: assetRes.secure_url,
                format: assetRes.format,
                size: assetRes.bytes,
            };

            // 4️⃣ update firestore
            await updateDoc(doc(db, "products", docId), {
                coverImage: coverUrl,
                galleryImages: galleryUrls,
                fileAsset: assetData,
                active: true,
                status: "published",
                updatedAt: serverTimestamp(),
            });

            navigate("/admin/product");

        } catch (err) {
            console.error(err);
            alert("Upload gagal");
        } finally {
            setLoading(false);
        }
    };
    //END, SUBMIT KE CLOUDINARY DAN UPDATE FIRESTORE ===================================================


    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit}>
                <ProdCreateHeader />

                <div className="mb-6">
                    <h4 className="text-3xl font-black uppercase italic tracking-tighter leading-none">{product.title}</h4>
                    <h5 className="text-md text-gray-500 uppercase italic tracking-tighter leading-none">Create Product - Assets</h5>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <ProdCreateAssets
                        setCoverFile={setCoverFile}
                        setGalleryFiles={setGalleryFiles}
                        setAssetFile={setAssetFile}
                    />
                </div>
            </form>
        </div>
    );
}