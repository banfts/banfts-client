<script>
  import { API_URL, PER_PAGE } from '$lib/config/constants.js';
  import ListingCard from '$lib/components/ListingCard.svelte';
  import { usdPerBanano } from '$lib/services/price.js';

  export let data;

  let listings = data.listings;
  let noPageAfter = false;

  let searchQuery;
  let filterType;
  let searchError = false;
  let pageNum = 1;

  let extraQuery = "";

  async function marketSearch() {
    noPageAfter = false;

    if (filterType === "max-ask-price") {
      extraQuery = "&max_ask_price="+searchQuery;
    } else if (filterType === "supply-hash") {
      extraQuery = "&supply_hash="+searchQuery;
    } else if (filterType === "seller") {
      extraQuery = "&seller="+searchQuery;
    }

    const resp = await (await fetch(`${API_URL}/market/listings?per_page=${PER_PAGE}${extraQuery}&page_num=1`, {
      credentials: 'include',
    })).json();

    if (resp.success) {
      listings = resp.listings;
      noPageAfter = resp.no_page_after;
    }
  }

  async function pageChange(inc) {
    noPageAfter = false;

    if (inc) {
      pageNum++;
    } else {
      pageNum--;
    }

    const resp = await (await fetch(`${API_URL}/market/listings?per_page=${PER_PAGE}&page_num=${pageNum}${extraQuery}`, {
      credentials: 'include',
    })).json();

    if (resp.success) {
      listings = resp.listings;
      noPageAfter = resp.no_page_after;
    }
  }
</script>

<div class="flex flex-col w-full bg-base-300 rounded-box shadow p-4 my-4">
  <div class="mb-2 mx-auto">
    <div class="text-center mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-400 mb-2">Market</h1>
      <p class="small text-gray-600">View and Filter Listings.</p>
    </div>
  </div>

  <div class="mx-auto mb-4">
    <div class="join">
      <div>
        <div>
          <input class="input input-bordered w-full max-w-xs join-item{ searchError ? ' input-error' : '' }" placeholder="Filter" bind:value={searchQuery}/>
        </div>
      </div>
      <select class="select select-bordered join-item" bind:value={filterType}>
        <option disabled>Choose Filter</option>
        <option value="max-ask-price" selected>Max Ask Price</option>
        <option value="supply-hash">Supply Hash</option>
        <option value="seller">Seller</option>
      </select>
      <div>
        <button class="btn btn-primary join-item" on:click={marketSearch}>Filter</button>
      </div>
    </div>
  </div>

  <div class="divider"></div> 

  <div class="mt-4">
    <div class="max-w-7xl sm:px-4 lg:px-8">
      <h2 class="text-xl font-bold tracking-tight text-gray-400 mb-4">Results</h2>
    </div>
  </div>
  {#if listings.length == 0}
    <p class="max-w-full sm:px-4 lg:px-8">Looks like there's nothing here yet 👀. Quick, make a listing!</p>
  {/if}
  <div class="flex flex-col justify-between lg:h-full max-w-full px-4 pb-4 sm:px-6 lg:px-8">
    <div class="my-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {#each listings as listing}
        <ListingCard {listing} {usdPerBanano}/>
      {/each}
    </div>
    <div class="flex justify-center gap-2">
      <button class="btn btn-square btn-outline" on:click={() => pageChange(false)} disabled={pageNum === 1}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button class="btn btn-square btn-outline" on:click={() => pageChange(true)} disabled={listings.length !== PER_PAGE || noPageAfter}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  </div>
</div>
