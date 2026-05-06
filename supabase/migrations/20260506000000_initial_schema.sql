-- Create movies table
CREATE TABLE IF NOT EXISTS movies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    telugu_title TEXT NOT NULL,
    telugu_poster_url TEXT,
    telugu_synopsis TEXT,
    source_title TEXT NOT NULL,
    source_poster_url TEXT,
    source_synopsis TEXT,
    category TEXT CHECK (category IN ('Remake', 'Inspired', 'Unofficial')) DEFAULT 'Remake',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user_votes table
CREATE TABLE IF NOT EXISTS user_votes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    movie_id UUID REFERENCES movies(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    fingerprint TEXT, -- For anonymous users
    agrees BOOLEAN NOT NULL,
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    -- Enforce one vote per movie per user or fingerprint
    CONSTRAINT unique_vote_per_movie_user UNIQUE (movie_id, user_id),
    CONSTRAINT unique_vote_per_movie_fingerprint UNIQUE (movie_id, fingerprint)
);

-- Enable RLS (to be configured in TOL-18)
ALTER TABLE movies ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_votes ENABLE ROW LEVEL SECURITY;

-- Add updated_at trigger for user_votes
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_votes_updated_at
    BEFORE UPDATE ON user_votes
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
