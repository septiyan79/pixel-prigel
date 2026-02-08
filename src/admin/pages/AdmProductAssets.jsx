import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

import ProdCreateHeader from "../components/ProdCreateHeader";
import ProdCreateAssets from "../components/ProdCreateAssets";

export default function AdmProductAssets() {
    const { docId } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

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
    }, [docId]);

    if (loading) return <p>Loading Product ... </p>;
    if (!product) return <p>Product not found.</p>;

    return (
        <div className="space-y-6">
            <ProdCreateHeader />

            <div className="mb-6">
                <h4 className="text-2xl font-black uppercase italic tracking-tighter leading-none">Create Product - Assets</h4>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <ProdCreateAssets />
            </div>
            {/* <p>{product.title}</p> */}
        </div>
    );
}