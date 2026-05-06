# T-Copy PWA — Execution Backlog (Linear → local for CLI)

This file mirrors the Linear project **T-Copy PWA** and is intended for CLI agents (e.g. Gemini CLI) that cannot access Linear directly.

- Linear project: `https://linear.app/tolly-holly-bolly/project/t-copy-pwa-a383c127c721`
- Team: **Tolly-Holly-Bolly** (`TOL`)

## Global sequence (do in order)

### Setup (parent story: TOL-5)
1. **TOL-14** — Scaffold app (PWA-capable) + dev scripts 
2. **TOL-13** — Configure environment variables + secret handling (Supabase) 
3. **TOL-12** — Set up routing + layout shell for compare flow 
4. **TOL-10** — Establish design tokens (dark theme + gold accents)
5. **TOL-11** — Add basic CI checks (lint/test/build) 

### Database (parent story: TOL-6) — depends on Setup
6. **TOL-16** — Create Supabase project + apply tables schema (depends on **TOL-13**)
7. **TOL-18** — Define RLS + policies for read movies / write votes
8. **TOL-19** — Design anonymous fingerprint strategy
9. **TOL-15** — Seed initial ~100 movie comparison records
10. **TOL-17** — Implement data access layer (fetch movies, upsert vote) (depends on **TOL-15**)

### UI (parent story: TOL-9) — depends on Setup
11. **TOL-20** — Build reusable MovieCard component(s) for both sides (depends on **TOL-10**)
12. **TOL-21** — Desktop split-screen compare layout (depends on **TOL-10**, **TOL-12**)
13. **TOL-23** — Mobile compare UI (stacked or swipeable cards) (depends on **TOL-10**, **TOL-12**)
14. **TOL-24** — Poster micro-interactions (hover/press scale + transitions) (depends on **TOL-10**)
15. **TOL-22** — Dynamic blurred background from active poster

### Interaction (parent story: TOL-7) — depends on UI (+ optional DB sync)
16. **TOL-25** — Implement vote state machine + localStorage persistence (depends on **TOL-21**, **TOL-23**)
17. **TOL-26** — Comment modal flow on vote (depends on **TOL-25**)
18. **TOL-27** — Voted state read-only panel (selection + saved comment) (depends on **TOL-25**, **TOL-26**)
19. **TOL-28** — Edit Response loop (reset to active, rewrite stored data) (depends on **TOL-27**)
20. **TOL-29** — Optional: sync votes to Supabase (upsert into user_votes) (depends on **TOL-19**, **TOL-17**, **TOL-25**)

### Deployment (parent story: TOL-8) — depends on Setup/UI/Interaction/DB
21. **TOL-30** — Set up hosting + deploy pipeline (preview + prod) (depends on **TOL-11**, **TOL-14**)
22. **TOL-31** — Finalize PWA manifest + service worker strategy (depends on **TOL-14**)
23. **TOL-34** — Configure Supabase env vars in deployment + rotate secrets (depends on **TOL-13**, **TOL-30**)
24. **TOL-32** — Production monitoring (errors + basic logging/analytics)
25. **TOL-33** — Performance budget + Lighthouse pass for key flows (depends on **TOL-30**, **TOL-31**)

---

## Issue details (source of truth = Linear)

### TOL-5 — Setup: project scaffold, tooling, and PWA baseline
Link: `https://linear.app/tolly-holly-bolly/issue/TOL-5/setup-project-scaffold-tooling-and-pwa-baseline`

**Acceptance Criteria**
- App boots without errors locally and in a production build
- Responsive layouts are supported (desktop + mobile)
- PWA install prompt works where supported
- Basic routing/navigation works for the core experience
- Environment/config setup exists for Supabase credentials (without committing secrets)

### TOL-6 — Database: Supabase schema + seed movies dataset
Link: `https://linear.app/tolly-holly-bolly/issue/TOL-6/database-supabase-schema-seed-movies-dataset`

**Acceptance Criteria**
- Supabase/Postgres tables exist: `movies`, `user_votes` (matching PRD schema)
- `movies.slug` is unique and usable for routing
- `user_votes` enforces uniqueness per `(movie_id, fingerprint)`
- Movies can be seeded/loaded and queried by the app
- Minimal RLS/policies allow intended read/write behavior (at least for anonymous voting) without exposing admin access

### TOL-7 — Interaction: anonymous voting, comments, local persistence, edit loop
Link: `https://linear.app/tolly-holly-bolly/issue/TOL-7/interaction-anonymous-voting-comments-local-persistence-edit-loop`

**Acceptance Criteria**
- Unvoted state shows two CTAs: **Copied!** and **Coincidence!**
- Voting persists per-movie in `localStorage`
- After voting, UI shows a read-only panel with my selection and saved comment
- "Edit Response" resets to active voting state and updates stored data immediately
- Voting flow triggers a comment modal/prompt

### TOL-8 — Deployment: production release, analytics, and PWA readiness
Link: `https://linear.app/tolly-holly-bolly/issue/TOL-8/deployment-production-release-analytics-and-pwa-readiness`

**Acceptance Criteria**
- Production build + deploy pipeline exists (preview + prod)
- PWA manifest + service worker configured appropriately
- Core pages load quickly (basic performance budget defined and met)
- Error monitoring/logging is in place for production
- Supabase environment variables are configured in deployment without leaking secrets

### TOL-9 — UI: cinematic side-by-side compare experience
Link: `https://linear.app/tolly-holly-bolly/issue/TOL-9/ui-cinematic-side-by-side-compare-experience`

**Acceptance Criteria**
- Ultra-dark theme (charcoal/slate) with cinematic gold highlights per PRD
- Desktop: side-by-side split layout with a central "vs" gutter/badge
- Mobile: stacked or swipeable compare UI optimized for thumb reach
- Posters have smooth hover/press micro-interactions
- Background can use a blurred version of the active poster (where available)

