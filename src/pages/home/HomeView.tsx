// HomeView.tsx
import React from 'react';
import { useHomeViewModel } from './UseHomeViewModel';
import { MovieCard } from '../../components/MovieCard';
import './HomeView.css'; // Changed to .css

interface HomeViewProps {
    favorites: any[];
    onToggleFavorite: (movie: any) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ favorites, onToggleFavorite }) => {
    const { query, setQuery, movies, loading, error, handleSearch } = useHomeViewModel();

    return (
        <div className="home-view">
            <header className="home-header">
                <h1 className="home-title">🎬 CineMatch</h1>
                <p className="home-subtitle">Discover your next favorite movie</p>
            </header>

            <form className="search-form" onSubmit={handleSearch}>
                <div className="search-wrapper">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search movies (min 2 chars)..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="submit" className="search-btn">
                        <span className="btn-text">Search</span>
                        <span className="btn-icon">🔍</span>
                    </button>
                </div>
            </form>

            {loading && (
                <div className="loader-container">
                    <div className="spinner"></div>
                    <p>Loading movies...</p>
                </div>
            )}

            {error && (
                <div className="error-banner">
                    <span className="error-icon">⚠️</span>
                    <span>{error}</span>
                </div>
            )}

            <div className="movie-grid">
                {movies.map((movie) => {
                    const isFav = favorites.some((f) => f.imdbID === movie.imdbID);
                    return (
                        <MovieCard
                            key={movie.imdbID}
                            movie={movie}
                            isFavorite={isFav}
                            onToggleFavorite={onToggleFavorite}
                        />
                    );
                })}
                {!loading && movies.length === 0 && !error && (
                    <div className="empty-state">
                        <span className="empty-icon">🎞️</span>
                        <p>No movies found. Try a different search.</p>
                    </div>
                )}
            </div>
        </div>
    );
};