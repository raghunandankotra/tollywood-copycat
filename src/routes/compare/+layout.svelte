<script lang="ts">
	import { page } from '$app/state';
	let { children } = $props();

	const navItems = [
		{ name: 'Movies', href: '/compare/movies' },
		{ name: 'Actors', href: '/compare/actors' },
		{ name: 'Box Office', href: '/compare/box-office' }
	];
</script>

<div class="flex flex-col min-h-screen">
	<header class="border-b border-brand-gold/20 p-4 bg-brand-charcoal sticky top-0 z-10">
		<div class="max-w-6xl mx-auto flex items-center justify-between">
			<div class="flex items-center gap-4">
				<a href="/" class="text-brand-gold hover:text-white transition-colors" aria-label="Go back to home">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
				</a>
				<h1 class="text-xl font-bold tracking-wider uppercase text-brand-gold">Compare Flow</h1>
			</div>
		</div>
	</header>

	<nav class="bg-brand-charcoal/50 backdrop-blur-md sticky top-[65px] z-10 border-b border-brand-gold/10">
		<div class="max-w-6xl mx-auto flex">
			{#each navItems as item}
				<a
					href={item.href}
					class="flex-1 py-3 text-center text-sm font-medium transition-all duration-300 border-b-2 {page.url.pathname.startsWith(item.href) ? 'text-brand-gold border-brand-gold bg-brand-gold/5' : 'text-gray-400 border-transparent hover:text-gray-200'}"
				>
					{item.name}
				</a>
			{/each}
		</div>
	</nav>

	<main class="flex-1 p-6 max-w-6xl mx-auto w-full">
		{@render children()}
	</main>
</div>
