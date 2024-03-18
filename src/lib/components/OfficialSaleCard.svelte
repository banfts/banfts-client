<script>
  import { IPFS_GATEWAY } from '$lib/config/constants.js';
  import { accountToIpfsCid } from '$lib/utils/ipfs.js';

  import { getCurrencyString } from '$lib/services/price.js';

  /*
  official_sale is actually
  {
    sale_info,
    supply,
  }
  */
  export let official_sale;

  /*
  //Official Sale schema
  official_sale: {
    supply_hash: string, //info like supply, name, image and whatnot can be looked up from this
    minter_seed: string, //minter seed
    sale_seed_index: number, //index of SALE_SEED (.env constant) that receives the payments
    sale_price: number,
    start_amount: number, //amount of nfts minted before the official sale
    total_sales: number, //cannot exceed max supply - start amount (unless max supply is 0 [infinite]), and starts at 0
    completed: boolean, //manually set to hide (in future, maybe have previously completed official sales viewable somewhere?),
    collection: string,
  }
  */

  let metadata;

  async function getMetadata() {
    metadata = await (await fetch(`${IPFS_GATEWAY}/${accountToIpfsCid(official_sale.supply.metadata_representative)}`)).json();
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
        <h2 class="card-title">{official_sale.supply.nft_metadata.name}</h2>
        <h3 class="card-title">From {official_sale.sale_info.collection}</h3>
        <div class="flex flex-col my-2">
          <div class="flex justify-between">
            <h3 class="text-sm text-gray-400">Ask Price</h3>
            <p class="text-end dark:text-yellow-200 font-bold">{official_sale.sale_info.sale_price} BAN</p>
          </div>
          <div class="flex justify-between">
            <p class="text-xs text-end dark:text-yellow-200">{getCurrencyString(official_sale.sale_info.sale_price)}</p>
          </div>
        </div>
        <div class="card-actions justify-end">
          <a href="/market/official_sales/listings?supply_hash={official_sale.sale_info.supply_hash}" class="btn btn-primary btn-sm btn-block">Buy</a>
        </div>
      {:else}
        <div class="flex justify-center">
          <span class="loading loading-spinner loading-lg"></span>
        </div>
      {/if}
    </div>
  </div>
</div>