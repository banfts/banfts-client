<script>
  import { API_URL, IPFS_GATEWAY } from '$lib/config/constants.js';
  import { getCurrencyString, getPrice } from '$lib/services/price.js';
  import { sessionAddress } from '$lib/services/stores.js';

  import ExternalLink from '$lib/components/ExternalLink.svelte';
  
  export let data;

  // Call to super duper make sure the price is fetched, sometimes with weird svelte navigations it isn't
  getPrice();

  let info = data.info;
  let listing = data.listing;
  let offers = listing?.offers;

  let atLeast = Math.ceil((listing?.ask_price*1.01)*100)/100 

  // The mask stuff taken from my jetstream0/ztmy. I think it's pretty cool
  let offersContainerEle;
  let mask = "linear-gradient(to right, #efefef 35%, #efefef 65%, rgba(255, 255, 255, 0.2))";

  function changeMask() {
    if (offersContainerEle.scrollLeft < 100) {
      mask = "linear-gradient(to right, #efefef 35%, #efefef 65%, rgba(255, 255, 255, 0.2))";
    } else if (offersContainerEle.scrollLeft > offersContainerEle.scrollWidth-offersContainerEle.clientWidth-100) {
      mask = "linear-gradient(to right, rgba(255, 255, 255, 0.2), #efefef 35%, #efefef 65%)";
    } else {
      mask = "linear-gradient(to right, rgba(255, 255, 255, 0.2), #efefef 35%, #efefef 65%, rgba(255, 255, 255, 0.2))";
    }
  }

  let buying = false;

  let errorMessageCheck;
  let successTx;

  async function requestCheck() {
    const resp = await (await fetch(`${API_URL}/market/listings/${data.mint_hash}/offers/check`, {
      credentials: 'include',
      method: 'POST',
    })).json();
    if (resp.success) {
      successTx = resp.nft_send_hash;
    } else {
      errorMessageCheck = resp.message;
    }
  }

  let deleteSuccess;

  async function cancelListing() {
    const resp = await (await fetch(`${API_URL}/market/listings/${data.mint_hash}`, {
      credentials: 'include',
      method: 'DELETE',
    })).json();
    if (resp.success) {
      deleteSuccess = true;
    }
  }

  async function acceptOffer(offerAddress) {
    await fetch(`${API_URL}/market/listings/${data.mint_hash}/offers/accept`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        offerAddress,
      }),
    });
  }
</script>

<svelte:head>
  <title>{data.found ? `Listing ${info.supply_hash}` : "Error"}</title>
</svelte:head>

<div class="flex flex-col w-full bg-base-300 rounded-box shadow p-4 my-4">
  {#if !data.found}
    <p class="mb-2"><span class="text-red-500">Error:</span> {data.message}</p>
    <p>Please double check to see if the URL is correct, and that you are logged in.</p>
  {:else}
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <div>
        <h1 class="text-4xl">{info.asset_supply.nft_metadata.name}{#if !listing.verified}<div class="badge badge-lg badge-error gap-2 ml-2 align-middle text-stone-800 font-semibold">Unverified Listing</div>{/if}</h1>
        <div>
          <span>Listed by <a class="link" href="/explorer/addresses?address={listing.account}">{listing.account.replace(listing.account.slice(10, -4), "...")}</a></span> - <a class="link" href="/explorer/supply?supply_hash={info.supply_hash}">More NFT Info</a>
        </div>
        <div>
          <span>Ask Price: </span><span class="dark:text-yellow-200">{listing.ask_price} BAN</span>
          -
          <span class="text-end dark:text-yellow-200">{getCurrencyString(listing.ask_price)}</span>
        </div>
        <div class="h-full pt-5">
          {#if info.asset_supply.nft_metadata.animation_url}
            <!-- svelte-ignore a11y-media-has-caption -->
            <video class="w-5/6" controls>
              <source src="{IPFS_GATEWAY}/{info.asset_supply.nft_metadata.animation_url}#x-ipfs-companion-no-redirect">
            </video>
          {:else}
            <img class="w-5/6" alt="{info.asset_supply.nft_metadata.name} Image" src="{IPFS_GATEWAY}/{info.asset_supply.nft_metadata.image}#x-ipfs-companion-no-redirect">
          {/if}
        </div>
      </div>
      <div>
        <div class="mb-2">
          {#if listing.verified}
            {#if $sessionAddress === listing.account}
              <h2 class="text-2xl">Cancel Listing</h2>
              <p class="mt-2">Click below to cancel the listing. The listed NFT will be returned, and all offers will be refunded.</p>
              <p class="mt-2 mb-2">The escrow address is <ExternalLink url="https://creeper.banano.cc/account/{listing.escrow_address}" content={listing.escrow_address}/>.</p>
              {#if deleteSuccess}
                <div class="alert alert-error mt-2 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>Offer cancelled, sending back NFT and refunding everyone.</span>
                </div>
              {/if}
              <button class="btn btn-error" on:click={cancelListing}>Cancel Listing</button>
            {:else}
              <h2 class="text-2xl">Buy This NFT!</h2>
              {#if buying}
                <div class="mt-2 mb-2">
                  <p class="mb-2">To instantly buy the NFT, send <b>at least {atLeast} BAN to the escrow address ({listing.escrow_address})</b>.</p>
                  <p class="mb-2">If you send less than this amount, it will become an offer that the lister has a choice to accept. If you send multiple sends, they will be totaled up, and execute an instant buy, if it the total amount sent equals or exceeds {atLeast} BAN.</p>
                  <p class="mb-2">1% of any send is taken as a fee. If your offer is not accepted, or listing is cancelled, you will be refunded, minus the fee. Please contact support (in our Discord linked at the bottom of the page) if you encounter any issues.</p>
                  <p class="mb-2">If you use the Bananostand wallet, <ExternalLink url="https://thebananostand.com?request=send&address={listing.escrow_address}&amount={atLeast}" content="click here to buy the NFT"/>.</p>
                  <p><b>Click the button below once you've sent some funds to the escrow address.</b></p>
                </div>
                <button class="btn btn-primary block" on:click={requestCheck}>Receive + Check for Instant Buy</button>
                {#if errorMessageCheck}
                  <div class="alert alert-warning mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <span>{errorMessageCheck}</span>
                    <div>
                      <span role="button" on:keydown={() => errorMessageCheck = undefined} on:click={() => errorMessageCheck = undefined} tabindex="0">
                        x
                      </span>
                    </div>
                  </div>
                {:else if successTx}
                  <div class="alert alert-success mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Success! You have bought the NFT. <ExternalLink url="https://creeper.banano.cc/hash/{successTx}" content="View NFT send on Creeper"/></span>
                  </div>
                {/if}
                <span role="button" class="underline text-red-500" on:keydown={() => buying = false} on:click={() => buying = false} tabindex="0">Go Back</span>
              {:else}
                <p class="mb-2 mt-2">Click below to start the process to buy the NFT.</p>
                <button class="btn btn-primary" on:click={() => buying = true}>Buy NFT!</button>
              {/if}
            {/if}
          {:else}
            <!-- TODO, reshow instructions on how to send NFT to escrow address? maybe a link? -->
            <p>This listing has not been verified yet! The listing owner probably has not sent the NFT to the <ExternalLink url="https://creeper.banano.cc/account/{listing.escrow_address}" content="escrow address"/>.</p>
          {/if}
        </div>
        <div>
          <h2 class="text-2xl">Offers</h2>
          <div class="overflow-x-auto flex flex-row mt-2 pb-2" bind:this={offersContainerEle} on:scroll={changeMask} style:mask style:-webkit-mask-image={mask}>
            {#each Object.keys(offers) as offerror}
              <div class="card bg-base-100 rounded-box shadow mr-5 min-w-fit">
                <div class="card-body">
                  <p><a class="link" href="/explorer/addresses?address={offerror}">{offerror.replace(offerror.slice(10, -4), "...")}</a> offers {offers[offerror]} BAN</p>
                  <!-- TODO, only show if owner -->
                  <button class="btn btn-neutral" on:click={() => acceptOffer(offerror)} disabled={ $sessionAddress !== listing.account }>Accept Offer</button>
                </div>
              </div>
            {/each}
            {#if Object.keys(offers).length == 0}
              <p>Currently no offers</p>
            {/if}
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
