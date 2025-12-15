import { useEffect, useState } from "react";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
} from "firebase/firestore";
import { db } from "../utils/Firebase";
import type { HotWheel } from "../types";

export const useHotWheels = () => {
    const [hotWheels, setHotWheels] = useState<HotWheel[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "hotwheels"),
            (snapshot) => {
                const cars: HotWheel[] = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                } as HotWheel));
                setHotWheels(cars);
                setLoading(false);
            },
        );

        return () => unsubscribe();
    }, []);

    const addHotWheel = async (car: Omit<HotWheel, "id">) => {
        await addDoc(collection(db, "hotwheels"), car);
    };

    const deleteHotWheel = async (id: string) => {
        await deleteDoc(doc(db, "hotwheels", id));
    };

    return { hotWheels, loading, addHotWheel, deleteHotWheel };
};
