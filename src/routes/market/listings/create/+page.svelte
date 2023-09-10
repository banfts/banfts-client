<script>
  import { API_URL, IPFS_GATEWAY } from '$lib/config/constants.js';
  import { accountToIpfsCid } from '$lib/utils/ipfs.js';

  import ExternalLink from '$lib/components/ExternalLink.svelte';

  export let data;

  let metadata;

  async function getMetadata() {
    if (data.found) {
      metadata = await (await fetch(`${IPFS_GATEWAY}/${accountToIpfsCid(data.info.asset.metadata_representative)}`)).json();
    }
  }

  getMetadata();

  let askPrice;

  let createMode = false;

  let searchError = false;

  let errorMessageCreate;

  let escrowAddress = false;

  let countdownMinute, countdownSecond;

  async function createListing() {
    if (isNaN(Number(askPrice)) || String(askPrice).split(".")[1]?.length > 2 || Number(askPrice) < 19) {
      searchError = true;
      // Terrible code
      setTimeout(() => window.location.reload(), 1500);
      return;
    }

    const resp = await (await fetch(`${API_URL}/market/listings/${data.mint_hash}`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        askPrice: Number(askPrice),
      }),
    })).json();

    if (!resp.success) {
      errorMessageCreate = resp.message;
      return;
    }

    escrowAddress = resp.escrow_address;

    createMode = true;

    let countdownInterval = setInterval(() => {
      if (!countdownMinute) {
        // User navigated away from page (todo: do this in ondestroy or something?)
        clearInterval(countdownInterval);
        return;
      }
      let cmValue = getComputedStyle(countdownMinute).getPropertyValue('--value');
      let csValue = getComputedStyle(countdownSecond).getPropertyValue('--value');

      let newSecond = Number(csValue)-1;
      let newMinute = Number(cmValue);
      if (newSecond < 0 && newMinute !== 0) {
        newSecond = 59;
        newMinute--;
      } else if (newSecond < 0 && newMinute === 0) {
        newSecond = 0;
        clearInterval(countdownInterval);
      }

      countdownSecond.style.setProperty('--value', String(newSecond));
      countdownMinute.style.setProperty('--value', String(newMinute));
    }, 1000);
  }

  let verified = false;

  async function checkStatus() {
    try {
      // Try and manually trigger a verification
      await fetch(`https://api.banfts.com/api/v1/market/listings/${data.mint_hash}/verify`, { 
        credentials: 'include',
        method: 'POST',
      });
    } catch (e) {
      console.log(e);
    }

    const resp = await (await fetch(`https://api.banfts.com/api/v1/market/listings/${data.mint_hash}`, { credentials: 'include' })).json();
    if (resp.success) {
      if (resp.market.listing?.verified) {
        verified = true;
        // Stop the count
        countdownSecond.style.setProperty('--value', "0");
        countdownMinute.style.setProperty('--value', "0");
      }
    }
  }
</script>

<svelte:head>
  <title>{data.found ? "Create New Listing" : "Error"}</title>
</svelte:head>

<div class="flex flex-col w-full bg-base-300 rounded-box shadow p-4 my-4">
  {#if !data.found}
    <p class="mb-2"><span class="text-red-500">Error:</span> {data.message}</p>
  {:else}
    <h1 class="text-4xl mb-2">Create Listing</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {#if createMode}
        <div>
          <h2 class="text-2xl">Sending Instructions</h2>
          <p class="mb-2">First, receive all pending transactions. Second, change your representative to <b>{data.info.assetRep}</b>. Then, send a 0.01 (or more) Banano transaction to <b>{escrowAddress}</b>. This will send your NFT to the escrow address.</p>
          <p class="mb-2">If you use the Bananostand wallet, <ExternalLink url="https://thebananostand.com/?request=change&address={data.info.assetRep}" content="to change your representative"/>, and <ExternalLink url="https://thebananostand.com?request=send&address={escrowAddress}&amount=.01" content="to send the NFT to the escrow address"/>.</p>
          <p class="mb-2">If, after 5 minutes, the listing is not marked as verified (check the <a class="link" href="/market/listings?mint_hash={data.mint_hash}">listing page</a>), but you have sent the NFT, please contact support at our Discord server. Please also contact support if you have not sent the NFT, but the listing is not deleted after 5 minutes, preventing you from listing again.</p>
          <p class="mb-2">Please send within 5 minutes, or the listing will be cancelled. <b>After you have sent the NFT, you MUST click the "Verify Listing" button below!</b></p>
          <span class="countdown font-mono text-2xl">
            <span style="--value:00;"></span>:
            <span bind:this={countdownMinute} style="--value:05;"></span>:
            <span bind:this={countdownSecond} style="--value:00;"></span>
          </span>
          {#if verified}
            <div class="alert alert-success">
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Listing has been verified, view it <a class="link" href="/market/listings?mint_hash={data.mint_hash}">here</a></span>
            </div>
          {/if}
          <br>
          <button class="btn btn-primary" on:click={checkStatus}>Verify Listing</button>
        </div>
      {:else}
        <div>
          <div>
            <p>
              Fill in what price you want to sell the NFT for, in whole Banano. The minimum is 19 Banano, and a 1% fee is taken on top of that, once the NFT is sold. The ask price cannot contain more than 2 decimal places. You will be asked to send the NFT to a generated address within 5 minutes, once you create the listing.
            </p>
          </div>
          {#if errorMessageCreate}
            <div class="alert alert-warning mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <span>{errorMessageCreate}</span>
              <div>
                <span role="button" on:keydown={() => errorMessageCreate = undefined} on:click={() => errorMessageCreate = undefined} tabindex="0">
                  x
                </span>
              </div>
            </div>
          {/if}
          <div class="form-control w-full max-w-xs mt-2">
            <label class="label" for="ask-price">
              <span class="label-text">Ask Price (At Least 19 Banano)</span>
            </label>
            <input id="ask-price" type="number" bind:value={askPrice} placeholder="19" class="input input-primary input-bordered w-full max-w-xs{ searchError ? ' input-error' : '' }" />
          </div>
          <div class="mt-2">
            <button class="btn btn-primary" on:click|once={createListing}>Create Listing</button>
          </div>
        </div>
      {/if}
      <div>
        {#if metadata}
          {#if metadata.animation_url}
            <!-- svelte-ignore a11y-media-has-caption -->
            <video class="w-5/6" controls>
              <source src="{IPFS_GATEWAY}/{metadata.image}#x-ipfs-companion-no-redirect">
            </video>
          {:else}
            <img class="h-full w-full object-cover object-center lg:h-full lg:w-full" src="{IPFS_GATEWAY}/{metadata.image}" alt="{metadata.name} Image" />
          {/if}
        {:else}
          <div class="flex justify-center">
            <span class="loading loading-spinner loading-lg"></span>
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>
