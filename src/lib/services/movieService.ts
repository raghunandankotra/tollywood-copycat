import { supabase } from '$lib/supabaseClient';
import type { Movie, VotePayload, UserVote } from '$lib/types';

export const movieService = {
    async fetchMovies(): Promise<Movie[]> {
        const { data, error } = await supabase
            .from('movies')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data as Movie[];
    },

    async fetchMovieBySlug(slug: string): Promise<Movie | null> {
        const { data, error } = await supabase
            .from('movies')
            .select('*')
            .eq('slug', slug)
            .single();

        if (error) {
            if (error.code === 'PGRST116') return null; // Not found
            throw error;
        }
        return data as Movie;
    },

    async upsertVote(payload: VotePayload): Promise<UserVote> {
        // Attempt to find existing vote by (movie_id, user_id) or (movie_id, fingerprint)
        const query = supabase
            .from('user_votes')
            .upsert(payload, { 
                onConflict: payload.user_id ? 'movie_id, user_id' : 'movie_id, fingerprint' 
            })
            .select()
            .single();

        const { data, error } = await query;

        if (error) throw error;
        return data as UserVote;
    },

    async fetchUserVote(movieId: string, identifier: { userId?: string, fingerprint?: string }): Promise<UserVote | null> {
        let query = supabase.from('user_votes').select('*').eq('movie_id', movieId);
        
        if (identifier.userId) {
            query = query.eq('user_id', identifier.userId);
        } else if (identifier.fingerprint) {
            query = query.eq('fingerprint', identifier.fingerprint);
        } else {
            return null;
        }

        const { data, error } = await query.maybeSingle();

        if (error) throw error;
        return data as UserVote;
    }
};
