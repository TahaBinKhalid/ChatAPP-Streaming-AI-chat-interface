import React from 'react';
import type { Movie } from '../types/Movie';
import './MovieCard.css';

interface MovieCardProps {
    movie: Movie;
    isFavorite?: boolean;
    onToggleFavorite?: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, isFavorite, onToggleFavorite }) => {
    return (
        <div className="movie-card">
            <div className="movie-card-image-wrapper">
                <img
                    src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}
                    alt={movie.Title}
                    className="movie-card-image"
                    loading="lazy"
                />
                <div className="movie-card-overlay">
                    <button
                        className={`movie-card-fav-btn ${isFavorite ? 'favorited' : ''}`}
                        onClick={() => onToggleFavorite && onToggleFavorite(movie)}
                        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                        <span className="fav-icon">{isFavorite ? '❤️' : '🤍'}</span>
                        <span className="fav-text">{isFavorite ? 'Remove' : 'Favorite'}</span>
                    </button>
                </div>
            </div>
            <div className="movie-card-info">
                <h3 className="movie-card-title">{movie.Title}</h3>
                <div className="movie-card-meta">
                    <span className="movie-card-year">{movie.Year}</span>
                    {movie.Type && (
                        <span className="movie-card-type">{movie.Type}</span>
                    )}
                </div>
            </div>
        </div>
    );
};