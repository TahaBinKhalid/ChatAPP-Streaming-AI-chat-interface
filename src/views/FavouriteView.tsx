import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged, type User } from 'firebase/auth';

export const FavouriteView: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [favorites, setFavorites] = useState<any[]>([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
            setUser(currentUser);
            if (currentUser) {
                // Fetch user-specific favorites from Firestore or local storage here
            } else {
                setFavorites([]);
            }
        });

        return () => unsubscribe();
    }, []);

    if (!user) {
        return <p>Please sign in to view your favorite movies.</p>;
    }

    return (
        <div className="favourite-container">
            <h2>Your Favorite Movies</h2>
            {favorites.length === 0 ? (
                <p>No favorite movies added yet.</p>
            ) : (
                <div className="movie-grid">
                    {favorites.map((movie, index) => (
                        <div key={index} className="movie-card">
                            <h3>{movie.title}</h3>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};