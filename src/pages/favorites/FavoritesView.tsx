import React from 'react';
import { useFavoritesViewModel } from './UseFavoritesViewModel';
import { MovieCard } from '../../components/MovieCard';
import './FavoritesView.css';

export const FavoritesView: React.FC = () => {
    const { user, favorites, loading, handleRemoveFavorite } = useFavoritesViewModel();

    if (!user) return <p style={{ padding: '2rem', textAlign: 'center' }}>Please sign in to view favorites.</p>;
    if (loading) return <p style={{ padding: '2rem', textAlign: 'center' }}>Loading favorites...</p>;

    return (
        <div className="favorites-view">
            <header className="favorites-header">
                <h2 className="favorites-title">⭐ Your Favorites</h2>
                <p className="favorites-count">{favorites.length} movie{favorites.length !== 1 ? 's' : ''} saved</p>
            </header>

            {favorites.length === 0 ? (
                <div className="empty-favorites">
                    <span className="empty-icon">🎥</span>
                    <p>No favorite movies saved yet.</p>
                    <span className="empty-subtext">Start exploring and save your must-watch films!</span>
                </div>
            ) : (
                <div className="favorites-grid">
                    {favorites.map((movie) => (
                        <MovieCard
                            key={movie.imdbID}
                            movie={movie}
                            isFavorite={true}
                            onToggleFavorite={() => handleRemoveFavorite(movie.imdbID)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};