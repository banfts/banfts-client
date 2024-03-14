<script>
  export let success, official_sale, asset_supply, send_address;

  //POST `${API_V1_PATH}/official_sales/:supplyHash/buy` for buy
</script>


<svelte:head>
  <title>{success ? `${asset_supply.nft_metadata.name} from ${official_sale.collection}` : "Error"}</title>
</svelte:head>

<div class="flex flex-col w-full bg-base-300 rounded-box shadow p-4 my-4">
  {#if !success}
    <p class="mb-2"><span class="text-red-500">Error: Page Not Found</span></p>
    <p>Please double check to see if the URL is correct, and that you are logged in.</p>
  {:else}
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <!--placeholder-->
    </div>
  {/if}
</div>

