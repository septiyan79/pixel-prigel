import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";

import ProdCreateHeader from "../components/ProdCreateHeader";
import ProdCreateAssets from "../components/ProdCreateAssets";

export default function AdmProductAssets() {
    const { docId } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const [coverFile, setCoverFile] = useState(null);
    const [galleryFiles, setGalleryFiles] = useState([]);
    const [assetFile, setAssetFile] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const docRef = doc(db, "products", docId);
                const snap = await getDoc(docRef);

                if (!snap.exists()) {
                    setProduct(null);
                } else {
                    setProduct({
                        id: snap.id,
                        ...snap.data(),
                    });
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct()
    }, []);

    if (loading) return <p>Loading Product ... </p>;
    if (!product) return <p>Product not found.</p>;

    return (
        <div className="space-y-6">
            <ProdCreateHeader />

            <div className="mb-6">
                <h4 className="text-3xl font-black uppercase italic tracking-tighter leading-none">{product.title}</h4>
                <h5 className="text-md text-gray-500 uppercase italic tracking-tighter leading-none">Create Product - Assets</h5>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <ProdCreateAssets />
            </div>
            {/* <p>{product.title}</p> */}
        </div>
    );
}