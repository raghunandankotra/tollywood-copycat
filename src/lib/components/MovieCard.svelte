<script lang="ts">
    let { 
        movie, 
        side = 'telugu',
        isHovered = false
    }: { 
        movie: { title: string, posterUrl: string, synopsis: string, year?: string }, 
        side?: 'telugu' | 'source',
        isHovered?: boolean
    } = $props();

	// Some poster hosts block hotlinking or require referrer headers.
	// We show a local fallback image if the remote image fails to load.
	let posterSrc = $state(movie.posterUrl || '/poster-fallback.svg');
	$effect(() => {
		posterSrc = movie.posterUrl || '/poster-fallback.svg';
	});
</script>

<div class="relative flex flex-col group/side overflow-hidden h-full">
    <div class="aspect-[2/3] relative overflow-hidden">
        <img 
            src={posterSrc} 
            alt={movie.title}
			referrerpolicy="no-referrer"
			loading="lazy"
			decoding="async"
			onerror={() => {
				posterSrc = '/poster-fallback.svg';
			}}
            class="w-full h-full object-cover transition-transform duration-700 {isHovered ? 'scale-110' : 'group-hover/side:scale-105'}"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-bg-secondary via-transparent to-transparent opacity-80"></div>
        <div class="absolute bottom-4 left-4 right-4">
            <h3 class="text-xl md:text-2xl font-bold text-white drop-shadow-lg">{movie.title}</h3>
            <div class="flex gap-2 mt-1">
                {#if movie.year}<span class="text-accent-gold text-xs font-medium">{movie.year}</span>{/if}
                <span class="text-text-secondary text-xs font-medium">
                    {side === 'telugu' ? 'Tollywood' : 'Original'}
                </span>
            </div>
        </div>
    </div>
    <div class="p-4 md:p-6 bg-bg-secondary/50 backdrop-blur-sm flex-1 border-t border-accent-gold/5">
        <p class="text-sm text-text-secondary line-clamp-3 italic">"{movie.synopsis}"</p>
    </div>
</div>
