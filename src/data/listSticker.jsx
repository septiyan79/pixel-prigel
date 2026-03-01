import {
    collection,
    getDocs,
    query,
    where,
    orderBy,
    limit as limitQuery,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

export const getStickers = async ({
    limit,
    activeStatus = "active", // "active" | "inactive" | "all"
} = {}) => {
    const constraints = [];

    if (activeStatus === "active") {
        constraints.push(where("active", "==", true));
    }

    if (activeStatus === "inactive") {
        constraints.push(where("active", "==", false));
    }

    // kalau "all", ga perlu where apa-apa

    constraints.push(orderBy("createdAt", "desc"));

    if (limit) {
        constraints.push(limitQuery(limit));
    }

    const q = query(collection(db, "products"), ...constraints);
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));
};

// STRUKTUR DATA FIRESTORE ============================================
// Product {
//   id: string
//   slug: string
//   title: string
//   description: string
//   category: string
//   tags: string[]
//   type: "digital"
//   license: "personal" | "commercial"
//   active: boolean
//   status: "draft" | "published"
  
//   coverImage: string
//   galleryImages: string[]

//   price: {
//     IDR: number
//     USD: number
//   }

//   fileAsset: {
//     driveLink?: string
//     images?: string[]
//   }

//   lynkid: string

//   createdAt: Timestamp
//   updatedAt: Timestamp
// }
