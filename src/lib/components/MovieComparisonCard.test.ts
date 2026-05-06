import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import MovieComparisonCard from './MovieComparisonCard.svelte';

describe('MovieComparisonCard', () => {
	const mockTelugu = {
		title: 'Gabbarsingh',
		posterUrl: 'https://example.com/telugu.jpg',
		synopsis: 'A brave cop takes on a local goon.',
		year: '2012'
	};

	const mockSource = {
		title: 'Dabangg',
		posterUrl: 'https://example.com/source.jpg',
		synopsis: 'A brave cop takes on a local goon.',
		year: '2010'
	};

	it('renders both movie titles', () => {
		render(MovieComparisonCard, { id: 'test-id', teluguMovie: mockTelugu, sourceMovie: mockSource });
		expect(screen.getByText('Gabbarsingh')).toBeInTheDocument();
		expect(screen.getByText('Dabangg')).toBeInTheDocument();
	});

	it('renders voting buttons in unvoted state', () => {
		render(MovieComparisonCard, { id: 'test-id-2', teluguMovie: mockTelugu, sourceMovie: mockSource });
		expect(screen.getByText('Copied!')).toBeInTheDocument();
		expect(screen.getByText('Coincidence!')).toBeInTheDocument();
	});

	it('renders category badge', () => {
		render(MovieComparisonCard, { id: 'test-id-3', teluguMovie: mockTelugu, sourceMovie: mockSource, category: 'Remake' });
		expect(screen.getByText('Remake')).toBeInTheDocument();
	});
});
