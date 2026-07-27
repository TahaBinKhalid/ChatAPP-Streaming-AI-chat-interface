import { initializeApp, getApps, getApp } from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    type User
} from "firebase/auth";
import { getDatabase, ref, set, get, remove } from "firebase/database";
import type { Movie } from "../types/Movie";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Safe initialization preventing duplicate app error during Vite HMR
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getDatabase(app);

export const FirebaseService = {
    auth,
    db,
    signIn: (e: string, p: string) => signInWithEmailAndPassword(auth, e, p),
    signUp: (e: string, p: string) => createUserWithEmailAndPassword(auth, e, p),
    logout: () => signOut(auth),
    onAuthChange: (callback: (user: User | null) => void) => onAuthStateChanged(auth, callback),

    async getFavorites(userId: string): Promise<Movie[]> {
        const favRef = ref(db, `users/${userId}/favorites`);
        const snapshot = await get(favRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            return Object.values(data);
        }
        return [];
    },

    async addFavorite(userId: string, movie: Movie): Promise<void> {
        const favRef = ref(db, `users/${userId}/favorites/${movie.imdbID}`);
        await set(favRef, movie);
    },

    async removeFavorite(userId: string, movieId: string): Promise<void> {
        const favRef = ref(db, `users/${userId}/favorites/${movieId}`);
        await remove(favRef);
    }
};