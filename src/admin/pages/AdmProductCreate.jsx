import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

import ProdCreateMetadata from "../components/ProdCreateMetadata";
import ProdCreateHeader from "../components/ProdCreateHeader";

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
            const productRef = await addDoc(collection(db, "products"), {
                title: form.title,
                slug: form.slug,
                category: form.category,
                description: form.description,

                type: "digital",
                license: "personal",

                price: {
                    IDR: Number(form.priceIDR),
                    USD: Number(form.priceUSD),
                },

                coverImage: null,
                galleryImages: [],
                fileAsset: null,

                lynkid: form.lynkid,
                tags: [],

                active: false,

                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });

            const docId = productRef.id;

            alert("Product berhasil ditambahkan");
            setForm(initialForm);
            navigate(`/admin/product/${docId}/assets`);

        } catch (err) {
            console.error(err);
            alert("Gagal menambahkan product");
        }
    };


    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit}>
                <ProdCreateHeader />

                <div className="mb-6">
                    <h4 className="text-2xl font-black uppercase italic tracking-tighter leading-none">Create Product - Metadata</h4>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <ProdCreateMetadata
                        form={form}
                        setForm={setForm}
                        handleChange={handleChange}
                    />
                </div>
            </form>
        </div>
    );
};
