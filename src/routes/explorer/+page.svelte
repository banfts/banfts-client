<script>
  import { goto } from '$app/navigation';

  import { validateBananoAddress, validateHexHash } from '$lib/utils/validate.js';

  let searchQuery;
  let filterType;
  let searchError = false;

  function explorerSearch() {
    //todo, error message is input is valid, or something
    searchQuery = searchQuery.trim();
    if (filterType === "address") {
      if (validateBananoAddress(searchQuery)) {
        return goto(`/explorer/addresses?address=${searchQuery}`);
      }
    } else if (filterType === "mint-hash") {
      if (validateHexHash(searchQuery)) {
        return goto(`/explorer/assets?mint_hash=${searchQuery}`);
      }
    } else if (filterType === "supply-hash") {
      if (validateHexHash(searchQuery)) {
        return goto(`/explorer/supply?supply_hash=${searchQuery}`);
      }
    } else if (filterType === "minter-address") {
      if (validateBananoAddress(searchQuery)) {
        return goto(`/explorer/minters?address=${searchQuery}`);
      }
    }
    searchError = true;
  }
</script>

<div class="flex flex-col w-full bg-base-300 rounded-box shadow p-4 my-4">
  <div class="mb-2 mx-auto">
    <div class="text-center mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-400 mb-2">Explorer</h1>
      <p class="small text-gray-600">Search by address, mint hash or supply hash.</p>
    </div>
  </div>

  <div class="mx-auto mb-4">
    <div class="join">
      <div>
        <div>
          <input class="input input-bordered w-full max-w-xs join-item{ searchError ? ' input-error' : '' }" placeholder="Search" bind:value={searchQuery}/>
        </div>
      </div>
      <select class="select select-bordered join-item" bind:value={filterType}>
        <option disabled>Choose Filter</option>
        <option value="address" selected>Address</option>
        <option value="mint-hash">Mint Hash</option>
        <option value="supply-hash">Supply Hash</option>
        <option value="minter-address">Minter Address</option>
      </select>
      <div>
        <button class="btn btn-primary join-item" on:click={explorerSearch}>Search</button>
      </div>
    </div>
  </div>

  <div class="divider"></div> 

  <div class="mt-4">
    <div class="max-w-7xl sm:px-4 lg:px-8">
      <h2 class="text-xl font-bold tracking-tight text-gray-400 mb-4">Featured</h2>
    </div>
  </div>
  <div class="max-w-full px-4 pb-4 sm:px-6 lg:px-8">
    <!--
    <div class="my-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      <div class="group">
        <div class="card card-compact w-100 bg-base-100 shadow-xl">
          <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
            <img class="h-full w-full object-cover object-center lg:h-full lg:w-full" src="https://dummyimage.com/600x400/000/fff" alt="Shoes" /> 
          </div>
          <div class="card-body">
            <h2 class="card-title">Asset Name</h2>
            <div class="flex flex-col my-2">
              <div class="flex justify-between">
                <h3 class="text-sm text-gray-400">Ask Price</h3>
                <p class="text-end text-yellow-200 font-bold">199 BAN</p>
              </div>
              <div class="flex justify-between">
                <p class="text-xs text-end text-yellow-200">$0.9 USD</p>
              </div>
            </div>
            <div class="card-actions justify-end">
              <button class="btn btn-primary btn-sm btn-block">Buy</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    -->
    <p>For now, check out the <a class="link" href="/market">Marketplace</a>, or <a class="link" href="/explorer/addresses?address=ban_1o7ija3mdbmpzt8qfnck583tn99fiupgbyzxtbk5h4g6j57a7rawge6yzxqp">an address with a lot of NFTs</a>.</p>
  </div>
</div>
