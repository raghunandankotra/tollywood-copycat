<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		// Root should land on the core experience.
		// We keep this client-side to avoid hardcoding deployment host logic.
		goto('/compare/movies');
	});
</script>

<div class="flex flex-col items-center justify-center h-64 text-gray-400">
	<p class="animate-pulse">Loading…</p>
	<p class="mt-3 text-sm">
		If you are not redirected,
		<a class="text-amber-400 hover:underline" href="/compare/movies">open comparisons</a>.
	</p>
</div>
