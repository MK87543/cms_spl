import { useEffect, useState } from "react";
import { auth, googleProvider } from "../utils/Firebase";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut as firebaseSignOut,
} from "firebase/auth";
import type { User } from "firebase/auth";

const getErrorMessage = (err: unknown): string => {
    if (err instanceof Error) {
        return err.message || "Authentication error.";
    }
    return "Authentication error.";
};

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const loginWithGoogle = async () => {
        setError(null);
        setLoading(true);
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err: unknown) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    const loginWithEmail = async (email: string, password: string) => {
        setError(null);
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err: unknown) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    const registerWithEmail = async (email: string, password: string) => {
        setError(null);
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err: unknown) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setError(null);
        setLoading(true);
        try {
            await firebaseSignOut(auth);
        } catch (err: unknown) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    return {
        user,
        loading,
        error,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        logout,
    };
};
