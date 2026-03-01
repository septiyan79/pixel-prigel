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

    // 🔥 ASSET BARU
    const [assetFiles, setAssetFiles] = useState([]);
    const [driveLink, setDriveLink] = useState("");

    // ================= AMBIL DATA PRODUCT =================
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
    // =======================================================

    // ================= SUBMIT =================
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;

        if (!coverFile) {
            alert("Cover wajib diupload");
            return;
        }

        setLoading(true);

        try {
            const baseFolder = `pixel-prigel/products/${product.slug}`;

            // 1️⃣ Upload Cover
            const coverRes = await uploadToCloudinary(
                coverFile,
                `${baseFolder}/cover`
            );

            const coverUrl = coverRes.secure_url;

            // 2️⃣ Upload Gallery
            const galleryUploads = galleryFiles.map((file) =>
                uploadToCloudinary(file, `${baseFolder}/gallery`)
            );

            const galleryResults = await Promise.all(galleryUploads);
            const galleryUrls = galleryResults.map((r) => r.secure_url);

            // 3️⃣ Upload Asset Images
            const assetUploads = assetFiles.map((file) =>
                uploadToCloudinary(file, `${baseFolder}/asset`)
            );

            const assetResults = await Promise.all(assetUploads);
            const assetImageUrls = assetResults.map((r) => r.secure_url);

            // 🔥 FILE ASSET MAP STRUCTURE
            const fileAssetData = {
                images: assetImageUrls,
                driveLink: driveLink || null,
            };

            // 4️⃣ Update Firestore
            await updateDoc(doc(db, "products", docId), {
                coverImage: coverUrl,
                galleryImages: galleryUrls,
                fileAsset: fileAssetData,
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
    // =======================================================

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit}>
                <ProdCreateHeader />

                <div className="mb-6">
                    <h4 className="text-3xl font-black uppercase italic tracking-tighter leading-none">
                        {product.title}
                    </h4>
                    <h5 className="text-md text-gray-500 uppercase italic tracking-tighter leading-none">
                        Create Product - Assets
                    </h5>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <ProdCreateAssets
                        setCoverFile={setCoverFile}
                        setGalleryFiles={setGalleryFiles}

                        // 🔥 kirim yang baru
                        setAssetFiles={setAssetFiles}
                        driveLink={driveLink}
                        setDriveLink={setDriveLink}
                    />
                </div>
            </form>
        </div>
    );
}