import { movieService } from '$lib/services/movieService';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
    try {
        const movies = await movieService.fetchMovies();
        return {
            movies
        };
    } catch (e) {
        console.error('Error loading movies:', e);
        return {
            movies: [],
            error: 'Failed to load movies. Please check your Supabase configuration.'
        };
    }
};
