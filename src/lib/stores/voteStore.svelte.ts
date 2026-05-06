import { browser } from '$app/environment';
import { movieService } from '$lib/services/movieService';
import { getFingerprint } from '$lib/fingerprint';

export interface Vote {
    agrees: boolean;
    comment?: string;
    synced: boolean;
}

const STORAGE_KEY = 'tcopy_votes';

function createVoteStore() {
    let votes = $state<Record<string, Vote>>({});

    // Initialize from localStorage
    if (browser) {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                votes = JSON.parse(stored);
            } catch (e) {
                console.error('Failed to parse stored votes', e);
            }
        }
    }

    // Effect to persist to localStorage
    $effect.root(() => {
        $effect(() => {
            if (browser) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(votes));
            }
        });

        // Background sync for unsynced votes
        $effect(() => {
            if (browser) {
                Object.entries(votes).forEach(async ([movieId, vote]) => {
                    if (!vote.synced) {
                        try {
                            await movieService.upsertVote({
                                movie_id: movieId,
                                fingerprint: getFingerprint(),
                                agrees: vote.agrees,
                                comment: vote.comment
                            });
                            // We can't directly mutate votes here if it's derived or if we want to avoid loops,
                            // but since this is an effect on 'votes', we should be careful.
                            // However, marking synced is a one-way transition.
                            vote.synced = true; 
                        } catch (e) {
                            console.error(`Failed to sync vote for ${movieId}`, e);
                        }
                    }
                });
            }
        });
    });

    return {
        get all() { return votes; },
        getVote: (movieId: string) => votes[movieId],
        saveVote: (movieId: string, agrees: boolean, comment?: string) => {
            votes[movieId] = { agrees, comment, synced: false };
        },
        deleteVote: (movieId: string) => {
            delete votes[movieId];
        }
    };
}

export const voteStore = createVoteStore();
