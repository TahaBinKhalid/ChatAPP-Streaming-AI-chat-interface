// UseHomeViewModel.ts
import { useState, useEffect } from 'react';
import type { Movie } from '../../types/Movie';
import { getInitialRandomMovies, searchHomeMovies } from './HomeModel';

export function useHomeViewModel() {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadInitialMovies = async () => {
        setLoading(true);
        setError(null);
        setQuery('');
        try {
            const data = await getInitialRandomMovies();
            setMovies(data);
        } catch (err: any) {
            setError(err.message || 'Failed to load movies.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadInitialMovies();
    }, []);

    const handleSearch = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!query.trim()) {
            loadInitialMovies();
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const data = await searchHomeMovies(query);
            setMovies(data);
        } catch (err: any) {
            setError(err.message);
            setMovies([]);
        } finally {
            setLoading(false);
        }
    };

    return {
        query,
        setQuery,
        movies,
        loading,
        error,
        handleSearch,
        loadInitialMovies,
    };
}