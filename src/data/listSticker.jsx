import {
    collection,
    getDocs,
    query,
    where,
    orderBy,
    limit as limitQuery,
} from "firebase/firestore";
import { db } from "../firebase";

export const getStickers = async ({
    limit,
    onlyActive = true,
} = {}) => {
    const constraints = [];

    if (onlyActive) {
        constraints.push(where("active", "==", true));
    }

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