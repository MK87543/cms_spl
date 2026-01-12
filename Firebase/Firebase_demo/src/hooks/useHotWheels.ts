import { useEffect, useState } from "react";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    updateDoc,
} from "firebase/firestore";
import { db } from "../utils/Firebase";
import type { HotWheel } from "../types";

const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result as string);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};

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

    const addHotWheel = async (car: Omit<HotWheel, "id">, imageFile?: File) => {
        let imageUrl = "";
        if (imageFile) {
            try {
                imageUrl = await convertToBase64(imageFile);
            } catch (error) {
                console.error("Error converting image to base64:", error);
            }
        }
        await addDoc(collection(db, "hotwheels"), { ...car, imageUrl });
    };

    const deleteHotWheel = async (id: string) => {
        await deleteDoc(doc(db, "hotwheels", id));
    };

    const updateHotWheel = async (
        id: string,
        updates: Partial<HotWheel>,
        imageFile?: File,
    ) => {
        const updateData = { ...updates };
        if (imageFile) {
            try {
                updateData.imageUrl = await convertToBase64(imageFile);
            } catch (error) {
                console.error("Error converting image to base64:", error);
            }
        }
        await updateDoc(doc(db, "hotwheels", id), updateData);
    };

    return { hotWheels, loading, addHotWheel, deleteHotWheel, updateHotWheel };
};
