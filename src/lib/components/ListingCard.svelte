<script>
  import { IPFS_GATEWAY } from '$lib/config/constants.js';
  import { accountToIpfsCid } from '$lib/utils/ipfs.js';

  import { getCurrencyString } from '$lib/services/price.js';

  export let listing;

  let metadata;

  async function getMetadata() {
    metadata = await (await fetch(`${IPFS_GATEWAY}/${accountToIpfsCid(listing.metadata_representative)}`)).json();
  }

  getMetadata();
</script>

<div class="group">
  <div class="card card-compact w-100 bg-base-100 shadow-xl">
    {#if metadata}
      <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
        {#if metadata.animation_url}
          <!-- svelte-ignore a11y-media-has-caption -->
          <video class="w-5/6" controls>
            <source src="{IPFS_GATEWAY}/{metadata.animation_url}#x-ipfs-companion-no-redirect">
          </video>
        {:else}
          <img class="h-full w-full object-cover object-center lg:h-full lg:w-full" src="{IPFS_GATEWAY}/{metadata.image}" alt="{metadata.name} Image" />
        {/if}
      </div>
    {/if}
    <div class="card-body">
      {#if metadata}
        <h2 class="card-title">{metadata.name}</h2>
        <div class="flex flex-col my-2">
          <div class="flex justify-between">
            <h3 class="text-sm text-gray-400">Ask Price</h3>
            <p class="text-end dark:text-yellow-200 font-bold">{listing.ask_price} BAN</p>
          </div>
          <div class="flex justify-between">
            <p class="text-xs text-end dark:text-yellow-200">{getCurrencyString(listing.ask_price)}</p>
          </div>
        </div>
        <div class="card-actions justify-end">
          <a href="/market/listings?mint_hash={listing.mint_hash}" class="btn btn-primary btn-sm btn-block">Buy</a>
        </div>
      {:else}
        <div class="flex justify-center">
          <span class="loading loading-spinner loading-lg"></span>
        </div>
      {/if}
    </div>
  </div>
</div>
