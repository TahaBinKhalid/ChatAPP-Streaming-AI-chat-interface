import { useEffect, useState } from 'react';
import type { Movie } from '../../types/Movie';
import { FirebaseService } from '../../services/FirebaseService';
import { useAuth } from '../../context/AuthContext';

export const useFavoritesModel = () => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            FirebaseService.getFavorites(user.uid).then((data) => {
                setFavorites(data);
                setLoading(false);
            });
        } else {
            setFavorites([]);
            setLoading(false);
        }
    }, [user]);

    return { user, favorites, loading, setFavorites };
};