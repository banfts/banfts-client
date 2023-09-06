<script>
  import OwnedMintedCard from '$lib/components/OwnedMintedCard.svelte';

  export let assets;
  export let owned;
  export let totalAssets;

  let showMin = 0;
  let showMax = 8;

  function prevPage() {
    showMin -= 8;
    showMax -= 8;
  }

  function nextPage() {
    showMin += 8;
    showMax += 8;
  }
</script>

<div>
  <div class="my-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
    {#each assets as asset, index}
      {#if index >= showMin}
        {#if index < showMax}
          <OwnedMintedCard {owned} mintedNft={asset}/>
        {/if}
      {/if}
    {/each}
  </div>
  <div class="flex justify-center gap-2 mb-4">
    <button class="btn btn-square btn-outline" on:click={prevPage} disabled={ showMin === 0 }>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </button>
    <button class="btn btn-square btn-outline" on:click={nextPage} disabled={ showMax >= totalAssets }>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </button>
  </div>
</div>
