<script lang="ts">
	import { replaceState } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		// Automatically redirect to /compare/movies if at /compare
		replaceState('/compare/movies', {});
	});
</script>

<div class="flex flex-col items-center justify-center h-64 text-gray-400">
	<p class="animate-pulse">Loading comparison modules...</p>
</div>
