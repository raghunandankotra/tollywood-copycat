export interface Movie {
    id: string;
    slug: string;
    telugu_title: string;
    telugu_poster_url: string;
    telugu_synopsis: string;
    source_title: string;
    source_poster_url: string;
    source_synopsis: string;
    category: 'Remake' | 'Inspired' | 'Unofficial';
    created_at: string;
}

export interface UserVote {
    id: string;
    movie_id: string;
    user_id?: string;
    fingerprint?: string;
    agrees: boolean;
    comment?: string;
    created_at: string;
    updated_at: string;
}

export interface VotePayload {
    movie_id: string;
    user_id?: string;
    fingerprint?: string;
    agrees: boolean;
    comment?: string;
}
