<script>
  /*
  //Official Sale schema
  official_sale: {
    supply_hash: string, //info like supply, name, image and whatnot can be looked up from this
    (minter_seed: string, //minter seed) //not given in the api, obviously. or shouldn't
    sale_seed_index: number, //index of SALE_SEED (.env constant) that receives the payments
    sale_price: number,
    start_amount: number, //amount of nfts minted before the official sale
    total_sales: number, //cannot exceed max supply - start amount (unless max supply is 0 [infinite]), and starts at 0
    completed: boolean, //manually set to hide (in future, maybe have previously completed official sales viewable somewhere?),
    collection: string,
  }
  */
  export let data;
  let { success , official_sale, asset_supply, send_address, minter_info } = data;

  console.log(success)

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
      <div>
        <h1 class="text-4xl">{asset_supply.nft_metadata.name}<div class="badge badge-lg badge-accent gap-2 ml-2 align-middle text-stone-800 font-semibold">{official_sale.collection} Official Sale</div></h1>
        <div>
          <!--minter info and link to minter-->
          <span>Minter: <a class="link" href="/explorer/minters?address={asset_supply.minter_address}">{minter_info.name}</a></span>
        </div>
        <!--placeholder-->
      </div>
      <div>
        <p>This page is still under construction.</p>
        <!--placeholder-->
      </div>
    </div>
  {/if}
</div>

