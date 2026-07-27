import { useFavoritesModel } from './FavoritesModel';
import { FirebaseService } from '../../services/FirebaseService';

export const useFavoritesViewModel = () => {
    const { user, favorites, loading, setFavorites } = useFavoritesModel();

    const handleRemoveFavorite = async (movieId: string) => {
        if (!user) return;
        await FirebaseService.removeFavorite(user.uid, movieId);
        setFavorites(favorites.filter(m => m.imdbID !== movieId));
    };

    return {
        user,
        favorites,
        loading,
        handleRemoveFavorite,
    };
};