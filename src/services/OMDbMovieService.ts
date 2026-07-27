import type { Movie } from '../types/Movie';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

export async function searchMovies(query: string): Promise<Movie[]> {
    if (!query.trim()) return [];
    try {
        const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`);
        const data = await response.json();
        return data.Response === 'True' ? data.Search : [];
    } catch (error) {
        console.error("Error searching movies:", error);
        return [];
    }
}

export async function getMovieDetails(id: string) {
    try {
        const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}`);
        const data = await response.json();
        return data.Response === 'True' ? data : null;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        return null;
    }
}