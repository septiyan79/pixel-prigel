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
