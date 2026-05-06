-- RLS for movies
ALTER TABLE movies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on movies"
ON movies FOR SELECT
TO public
USING (true);

-- RLS for user_votes
ALTER TABLE user_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on user_votes"
ON user_votes FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow public insert access on user_votes"
ON user_votes FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Allow users to update their own votes"
ON user_votes FOR UPDATE
TO public
USING (
    (auth.uid() = user_id) OR 
    (user_id IS NULL AND fingerprint IS NOT NULL) -- Fingerprint updates are less secure but allowed for this prototype
);
