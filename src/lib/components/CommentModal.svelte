<script lang="ts">
    let { 
        isOpen, 
        movieTitle, 
        onConfirm, 
        onCancel 
    }: { 
        isOpen: boolean, 
        movieTitle: string, 
        onConfirm: (comment: string) => void, 
        onCancel: () => void 
    } = $props();

    let comment = $state('');

    function handleConfirm() {
        onConfirm(comment);
        comment = '';
    }
</script>

{#if isOpen}
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <!-- Backdrop -->
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div 
            class="absolute inset-0 bg-bg-primary/80 backdrop-blur-md"
            onclick={onCancel}
        ></div>

        <!-- Modal Content -->
        <div class="relative bg-bg-secondary border border-accent-gold/20 p-6 rounded-2xl shadow-2xl max-w-md w-full animate-in fade-in zoom-in duration-300">
            <h3 class="text-xl font-bold text-accent-gold mb-2">Leave a comment</h3>
            <p class="text-text-secondary text-sm mb-4">Why do you think <span class="text-white font-semibold">{movieTitle}</span> is a match?</p>
            
            <textarea
                bind:value={comment}
                placeholder="Share your thoughts (optional)..."
                class="w-full bg-bg-primary border border-accent-gold/10 rounded-xl p-4 text-text-primary focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/50 outline-none transition-all h-32 resize-none mb-6"
            ></textarea>

            <div class="flex gap-4">
                <button
                    onclick={onCancel}
                    class="flex-1 py-3 text-text-secondary font-bold hover:text-white transition-colors uppercase tracking-widest text-xs"
                >
                    Skip
                </button>
                <button
                    onclick={handleConfirm}
                    class="flex-1 py-3 bg-accent-gold text-bg-primary font-black rounded-xl hover:bg-white transition-colors uppercase tracking-widest text-xs"
                >
                    Submit Vote
                </button>
            </div>
        </div>
    </div>
{/if}
