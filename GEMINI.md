## Project Configuration

- **Language**: TypeScript
- **Package Manager**: npm
- **Add-ons**: tailwindcss

---

# Project Context: Tollywood vs. The World (Movie Copier App)

## Overview
A highly polished, interactive Progressive Web App (PWA) showcasing 100+ instances where Telugu (Tollywood) movies were heavily inspired by, or remade from, Hollywood/Bollywood movies. Users view side-by-side poster comparisons, read plot summaries, and vote "Agree" or "Disagree" on the match, leaving a comment. Returning users can see their prior votes and edit them.

## Tech Stack
- **Framework:** SvelteKit (or Next.js App Router, depending on current CLI workspace setup)
- **Database / Backend:** Supabase (Postgres, Auth, and Storage)
- **Styling:** Tailwind CSS (Dark aesthetic: rich charcoal backgrounds, cinematic gold highlights, smooth transitions)
- **State Management:** LocalStorage fallback syncing to Supabase Auth profiles
- **Offline / PWA:** Service worker caching, custom manifest.json, offline-ready UI

## Architecture & Database Schema
1. **`movies` table:** - `id` (uuid, PK)
   - `telugu_title` (text)
   - `telugu_poster_url` (text)
   - `telugu_synopsis` (text)
   - `source_title` (text)
   - `source_poster_url` (text)
   - `source_synopsis` (text)
   - `category` (Remake / Unofficial / Inspired)

2. **`user_votes` table:**
   - `id` (uuid, PK)
   - `user_id` (uuid, FK to auth.users, nullable for local-only users)
   - `movie_id` (uuid, FK to movies)
   - `agrees` (boolean)
   - `comment` (text)
   - `created_at` (timestamp)
   - `updated_at` (timestamp)

## UX / UI Design Guidelines
- **Cinematic Vibe:** Use custom artistic borders, blurred movie poster backgrounds, and smooth micro-interactions.
- **Side-by-Side View:** On desktop, show a split layout. On mobile, use a clean swipeable comparative card.
- **Vote & Edit Loop:** If a user has already voted on a movie (tracked via database for logged-in users, or `localStorage` for guests), hide the initial vote buttons and show a sleek "You voted: AGREE / DISAGREE" card displaying their comment with an "Edit Vote" option.

## Code Standards
- Strict TypeScript.
- Component-driven architecture.
- Keep components clean, modular, and performant.
- Use Supabase JS client SDK with type safety.
- Write robust service workers for the PWA configuration.