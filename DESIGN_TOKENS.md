# Design Tokens

This document outlines the core design tokens for the Tollywood Copycat application, ensuring a premium and cinematic visual identity.

## Colors

| Token | Value | Description |
| :--- | :--- | :--- |
| `bg-primary` | `#0a0a0a` | Deep charcoal/black for primary backgrounds. |
| `bg-secondary` | `#1a1a1a` | Slightly lighter grey for cards and sections. |
| `accent-gold` | `#FFD700` | Primary gold for buttons, highlights, and active states. |
| `accent-gold-muted` | `#B8860B` | Muted gold for borders or secondary accents. |
| `text-primary` | `#EDEDED` | Off-white for primary text. |
| `text-secondary` | `#A0A0A0` | Medium grey for secondary text and captions. |

## Typography

| Token | Size | Line Height | Description |
| :--- | :--- | :--- | :--- |
| `heading-xl` | `3rem` | `1.1` | Main page titles and hero text. |
| `heading-lg` | `2rem` | `1.2` | Section headers. |
| `body` | `1rem` | `1.5` | Standard paragraph text. |
| `caption` | `0.875rem` | `1.4` | Small text for metadata or hints. |

## Usage in Tailwind CSS

These tokens are integrated into the Tailwind CSS theme. You can use them as standard utility classes:

- **Colors:** `bg-bg-primary`, `text-accent-gold`, `border-accent-gold-muted`
- **Typography:** Custom heading styles are applied globally to `h1`, `h2`, and `p` tags.

## Implementation Details

The tokens are defined in `src/routes/layout.css` within the `@theme` block of Tailwind CSS 4.
