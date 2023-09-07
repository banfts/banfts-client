<script>
  import { IPFS_GATEWAY } from '$lib/config/constants.js';

  export let supplyInfo;
</script>

<div class="group">
  <div class="card card-compact w-100 bg-base-100 shadow-xl">
    <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
      {#if supplyInfo.nft_metadata.animation_url}
        <!-- svelte-ignore a11y-media-has-caption -->
        <video class="w-5/6" controls>
          <source src="{IPFS_GATEWAY}/{supplyInfo.nft_metadata.animation_url}#x-ipfs-companion-no-redirect">
        </video>
      {:else}
        <img class="h-full w-full object-cover object-center lg:h-full lg:w-full" src="{IPFS_GATEWAY}/{supplyInfo.nft_metadata.image}" alt="{supplyInfo.nft_metadata.name} Image" />
      {/if}
    </div>
    <div class="card-body">
      <h2 class="card-title"><a class="link" href="/explorer/supply?supply_hash={supplyInfo.supply_hash}">{supplyInfo.nft_metadata.name}</a></h2>
      <div class="card-actions justify-end">
        <a href="/market?supply_hash={supplyInfo.supply_hash}" class="btn btn-primary btn-sm btn-block">Find In Marketplace</a>
      </div>
    </div>
  </div>
</div>
