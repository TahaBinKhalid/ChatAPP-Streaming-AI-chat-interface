// Movie Model (derived from OMDb API)
export interface Movie {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    Type: string;
}

// Detailed Movie Model (for single movie views/modals)
export interface MovieDetail extends Movie {
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Actors: string;
    Plot: string;
    imdbRating: string;
}

// User Profile Model (Firebase Auth state)
export interface UserProfile {
    uid: string;
    email: string | null;
}

// Favorite Item Model (Stored in Firebase Realtime Database)
export interface FavoriteMovieItem {
    movie: Movie;
    addedAt: number;
}