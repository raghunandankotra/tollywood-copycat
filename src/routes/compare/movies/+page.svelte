<script lang="ts">
	import MovieComparisonCard from '$lib/components/MovieComparisonCard.svelte';
    let { data } = $props();
</script>

<div class="space-y-12">
	<div class="flex flex-col items-center justify-center py-10 text-center border-b border-accent-gold/10">
		<h2 class="text-3xl md:text-4xl font-black text-accent-gold mb-3 tracking-tighter uppercase italic">Movie Comparisons</h2>
		<p class="text-text-secondary max-w-md font-medium">The legendary face-offs between Tollywood and the rest of the world.</p>
	</div>

    {#if data.error}
        <div class="max-w-4xl mx-auto p-8 border border-red-500/20 bg-red-900/10 rounded-2xl text-center">
            <p class="text-red-200 font-semibold mb-2">{data.error}</p>
            <p class="text-red-200/60 text-sm">Make sure to set your Supabase credentials in <code class="bg-bg-primary px-2 py-1 rounded">.env</code></p>
        </div>
    {/if}

	<div class="max-w-4xl mx-auto space-y-12">
        {#each data.movies as movie (movie.id)}
            <MovieComparisonCard 
                id={movie.id}
                teluguMovie={{
                    title: movie.telugu_title,
                    posterUrl: movie.telugu_poster_url,
                    synopsis: movie.telugu_synopsis
                }}
                sourceMovie={{
                    title: movie.source_title,
                    posterUrl: movie.source_poster_url,
                    synopsis: movie.source_synopsis
                }}
                category={movie.category}
            />
        {:else}
            {#if !data.error}
                <div class="text-center py-20">
                    <div class="animate-pulse flex flex-col items-center">
                        <div class="h-12 w-12 bg-accent-gold/20 rounded-full mb-4"></div>
                        <p class="text-text-secondary">Searching for matches...</p>
                    </div>
                </div>
            {/if}
        {/each}
	</div>
</div>
