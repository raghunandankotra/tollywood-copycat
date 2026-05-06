# PRODUCT REQUIREMENT DOCUMENT (PRD)
## Project Name: Tollywood Copycat (T-Copy)
## Objective: 
A highly-polished, cinematic, interactive Progressive Web App (PWA) comparing ~100 Tollywood (Telugu) movies side-by-side with their Hollywood or Bollywood inspirations. Users can vote "Agree" (Copied!) or "Disagree" (Coincidence!) on matches and leave a comment.

---

## 🛠️ Feature & Architecture Specification

### 1. Visual & UI Guidelines (The "Cinematic Art" Aesthetic)
- **Theme:** Ultra-dark mode (rich slate/charcoal `#0B0F19`, high-contrast cinematic gold highlights `#E5A93B` or `#FFC72C`).
- **Responsive Screen States:**
  - **Desktop:** Side-by-side split screen view. Left card = Tollywood movie (Poster, Title, Synopsis). Right card = Source movie. Center dividing gutter holds the "vs" visual badge.
  - **Mobile:** A vertically stacked, fluid comparative layout or a swipeable card-style UI optimized for thumb-reach.
- **Micro-Interactions:** - Dynamic blur background using a blurred version of the current movie poster.
  - Smooth scale transitions on hover for poster assets.
  - Pop-up modal triggers for adding a comment upon voting.

### 2. The Core Voting & Editing Loop (State Management)
- **Anonymity & Frictionless First-Visit:** Users can vote and comment without registering an account.
- **Local Persistence:** Client-side state MUST utilize `localStorage` to save the user's vote status and comment payload for each movie ID.
- **Interactive States:**
  - **Unvoted State:** Displays two call-to-action buttons: "Copied! 🎯" (Agree) and "Coincidence! 🤷‍♂️" (Disagree).
  - **Voted State:** Once a user votes, the buttons fade out. The UI reveals a customized read-only panel showing their chosen selection ("You agreed this was a copy" or "You voted Coincidence") along with their saved comment text.
  - **Edit Loop:** A clean "Edit Response ✏️" button resets the interactive UI back to the active voting state, allowing updates which instantly rewrite the local storage / database record.
- **Global Sync (Optional Cloud Save):** Supabase integration mapping local votes to authenticated profiles.

### 3. Database Schema (Supabase / Postgres)
The system requires two core relational tables:

```sql
-- Movies Table
create table public.movies (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  t_title text not null,
  t_poster_url text not null,
  t_synopsis text not null,
  source_title text not null,
  source_poster_url text not null,
  source_synopsis text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- User Votes Table
create table public.user_votes (
  id uuid default gen_random_uuid() primary key,
  movie_id uuid references public.movies(id) on delete cascade not null,
  fingerprint text not null, -- Anonymous device identifier or user ID
  agrees boolean not null, -- TRUE = Copied, FALSE = Coincidence
  comment text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint unique_user_vote unique (movie_id, fingerprint)
);