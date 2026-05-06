<script lang="ts">
    import MovieCard from './MovieCard.svelte';
    import CommentModal from './CommentModal.svelte';
    import { voteStore } from '$lib/stores/voteStore.svelte';
	
    interface MovieData {
		title: string;
		posterUrl: string;
		synopsis: string;
		year?: string;
		rating?: string;
	}

	let { 
        id,
		teluguMovie, 
		sourceMovie, 
		category = 'Remake' 
	}: { 
        id: string,
		teluguMovie: MovieData, 
		sourceMovie: MovieData, 
		category?: 'Remake' | 'Inspired' | 'Unofficial' 
	} = $props();

	const categoryColors = {
		Remake: 'bg-red-900/40 text-red-200 border-red-500/30',
		Inspired: 'bg-blue-900/40 text-blue-200 border-blue-500/30',
		Unofficial: 'bg-orange-900/40 text-orange-200 border-orange-500/30'
	};

    let activePoster = $state(teluguMovie.posterUrl);
    let currentVote = $derived(voteStore.getVote(id));
    let showCommentModal = $state(false);
    let pendingVoteType = $state<boolean | null>(null);

    // Update activePoster when teluguMovie changes (e.g. on navigation)
    $effect(() => {
        activePoster = teluguMovie.posterUrl;
    });

    function initiateVote(agrees: boolean) {
        pendingVoteType = agrees;
        showCommentModal = true;
    }

    function confirmVote(comment: string) {
        if (pendingVoteType !== null) {
            voteStore.saveVote(id, pendingVoteType, comment);
            showCommentModal = false;
            pendingVoteType = null;
        }
    }

    function cancelVote() {
        showCommentModal = false;
        pendingVoteType = null;
    }

    function handleEdit() {
        voteStore.deleteVote(id);
    }
</script>

<CommentModal 
    isOpen={showCommentModal} 
    movieTitle={teluguMovie.title}
    onConfirm={confirmVote}
    onCancel={cancelVote}
/>

<div class="group relative overflow-hidden rounded-2xl border border-accent-gold/10 bg-bg-secondary shadow-2xl transition-all duration-500 hover:border-accent-gold/30 hover:shadow-accent-gold/5">
	<!-- TOL-22: Dynamic blurred background -->
    <div class="absolute inset-0 z-0 opacity-20 blur-3xl scale-110 pointer-events-none">
        <img src={activePoster} alt="" class="w-full h-full object-cover" />
    </div>

    <!-- Category Badge -->
	<div class="absolute top-4 left-1/2 -translate-x-1/2 z-20">
		<span class="px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase border backdrop-blur-md {categoryColors[category]}">
			{category}
		</span>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-0 relative z-10">
		<!-- VS Divider (Desktop) -->
		<div class="hidden md:flex absolute inset-0 items-center justify-center z-10 pointer-events-none">
			<div class="bg-bg-primary border border-accent-gold/30 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl">
				<span class="text-accent-gold font-black italic tracking-tighter text-xl">VS</span>
			</div>
			<div class="absolute h-full w-px bg-gradient-to-b from-transparent via-accent-gold/20 to-transparent"></div>
		</div>

		<!-- Telugu Movie Side -->
        <div 
            role="presentation"
            onmouseenter={() => activePoster = teluguMovie.posterUrl}
            class="h-full"
        >
		    <MovieCard movie={teluguMovie} side="telugu" isHovered={activePoster === teluguMovie.posterUrl} />
        </div>

		<!-- Source Movie Side -->
		<div 
            role="presentation"
            onmouseenter={() => activePoster = sourceMovie.posterUrl}
            class="border-t md:border-t-0 md:border-l border-accent-gold/5 h-full"
        >
			<MovieCard movie={sourceMovie} side="source" isHovered={activePoster === sourceMovie.posterUrl} />
		</div>
	</div>

	<!-- Interactive Footer -->
	<div class="border-t border-accent-gold/10 p-4 bg-bg-primary/30 relative z-10">
        {#if !currentVote}
            <div class="flex justify-between items-center">
                <div class="flex gap-4">
                    <button 
                        onclick={() => initiateVote(true)}
                        class="px-6 py-2 bg-accent-gold text-bg-primary font-bold rounded-lg hover:bg-white transition-colors flex items-center gap-2 text-sm uppercase tracking-wider"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v4h3v7h4v-7h3l1-4h-4V7c0-1 1-1 1-1h3V2h-3c-3 0-5 2-5 5v3H7z"/></svg>
                        Copied!
                    </button>
                    <button 
                        onclick={() => initiateVote(false)}
                        class="px-6 py-2 border border-text-secondary/30 text-text-secondary font-bold rounded-lg hover:border-accent-gold hover:text-accent-gold transition-colors flex items-center gap-2 text-sm uppercase tracking-wider"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        Coincidence!
                    </button>
                </div>
                <button class="text-accent-gold/70 hover:text-accent-gold transition-colors text-xs font-bold uppercase tracking-tighter">
                    View Match Detail →
                </button>
            </div>
        {:else}
            <!-- TOL-27: Voted state read-only panel -->
            <div class="flex justify-between items-center bg-bg-secondary/40 p-3 rounded-xl border border-accent-gold/5">
                <div class="flex items-center gap-4">
                    <div class="flex items-center gap-2">
                        <span class="text-text-secondary text-sm">Your Verdict:</span>
                        <span class="px-3 py-1 rounded-md text-xs font-black uppercase tracking-widest {currentVote.agrees ? 'bg-accent-gold text-bg-primary' : 'bg-red-900/40 text-red-200 border border-red-500/30'}">
                            {currentVote.agrees ? 'Copied' : 'Coincidence'}
                        </span>
                    </div>
                    {#if currentVote.comment}
                        <div class="h-4 w-px bg-accent-gold/20"></div>
                        <p class="text-text-secondary text-sm italic line-clamp-1 max-w-xs">"{currentVote.comment}"</p>
                    {/if}
                </div>
                <!-- TOL-28: Edit Response loop -->
                <button 
                    onclick={handleEdit}
                    class="text-accent-gold hover:text-white transition-colors text-xs font-bold uppercase tracking-widest border-b border-accent-gold/30 hover:border-white"
                >
                    Edit Response
                </button>
            </div>
        {/if}
	</div>
</div>
