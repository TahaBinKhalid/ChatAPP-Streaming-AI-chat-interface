// HomeModel.ts
import { searchMovies } from '../../services/OMDbMovieService';
import type { Movie } from '../../types/Movie';

const SEED_KEYWORDS = ['Batman', 'Avengers', 'Matrix', 'Spider', 'Star', 'Lord', 'Fast', 'Mission'];

export async function getInitialRandomMovies(): Promise<Movie[]> {
    const shuffled = [...SEED_KEYWORDS].sort(() => 0.5 - Math.random());
    const selectedKeywords = shuffled.slice(0, 3);

    const promises = selectedKeywords.map((keyword) =>
        searchMovies(keyword).catch(() => [])
    );
    const results = await Promise.all(promises);

    const combined = results.flat();
    const uniqueMovies = Array.from(new Map(combined.map((m) => [m.imdbID, m])).values());

    return uniqueMovies.sort(() => 0.5 - Math.random()).slice(0, 20);
}

export async function searchHomeMovies(query: string): Promise<Movie[]> {
    if (!query || query.trim().length < 2) {
        throw new Error('Search query must contain at least 2 characters.');
    }
    return await searchMovies(query);
}