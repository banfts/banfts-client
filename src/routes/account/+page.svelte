<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  import AddressNfts from '$lib/components/AddressNfts.svelte';
  import { format_commas } from '$lib/utils/format.js';
  import { getCurrencyString } from '$lib/services/price.js';
  import { sessionAddress } from '$lib/services/stores.js';

  export let data;

  let balance_decimal = data.account?.network?.balance_decimal;
  balance_decimal = balance_decimal?.split(".")[0]+"."+balance_decimal?.split(".")[1].slice(0,2);

  onMount(() => {
    if (navigator?.clipboard) {
      document.getElementById("copy-address").onclick = () => {
        navigator.clipboard.writeText(data.account.address);
      };
    }
  });
</script>

{#if data.success}
  <div class="flex flex-col min-h-full bg-base-300 rounded-box shadow mt-4">
    <div class="flex justify-between w-full items-center space-x-2 py-2 px-3 lg:py-3 lg:px-8">

      <div class="flex-none avatar">
        <div class="w-8 my-auto bg-neutral rounded">
          <img src="https://monkey.banano.cc/api/v1/monkey/{data.account.address}" alt="{data.account.address} MonKey"/>
        </div>
      </div>
      <div class="flex-1 max-w-full overflow-hidden">
      
        <h1 class="me-auto text-lg font-light tracking-tight text-gray-400 sm:text-xl truncate">{data.account.address}</h1>
      </div>
      <div class="flex-none self-center">
        <ul>
          <li class="tooltip tooltip-bottom" data-tip="Copy to clipboard">
            <button id="copy-address" class="btn btn-ghost btn-sm btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
              </svg>
            </button>
          </li>
          <li class="tooltip tooltip-bottom" data-tip="Back" aria-current={$page.url.pathname === '/explorer' ? 'page' : undefined}>
            <a class="btn btn-ghost btn-sm btn-circle" href="/explorer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="min-h-full bg-base-300 rounded-box shadow my-4">
    <div class="pt-4 lg:pt-8">
      <div class="mx-auto max-w-4xl px-4 sm:px-4 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8">
        <div class="overflow-hidden rounded">
          <img src="https://monkey.banano.cc/api/v1/monkey/{data.account.address}" alt="{data.account.address} MonKey" class="w-5/6 object-cover object-center">
        </div>

        <div class="mt-4 lg:row-span-1 lg:mt-0">
          <h2 class="sr-only">Account Information</h2>
          <p class="text-3xl tracking-tight text-gray-400 dark:text-gray-300 mb-4">Account { $sessionAddress === data.account.address ? "(you)" : "" }</p>

          <div>
            <h3 class="sr-only">Description</h3>
            <div class="space-y-6">
              <p class="text-base text-gray-400">{format_commas(String(balance_decimal))}~ BAN ({getCurrencyString(balance_decimal)})</p>
            </div>
          </div>

          <div class="mt-8">
            <a class="btn btn-primary btn-block" href="#owned">Scroll To Owned NFTs</a>
          </div>
          <div class="mt-8">
            <h3 class="font-medium text-gray-400 mb-2">Details</h3>
            <span class="text-gray-500 text-xs">Registered</span>
            <p class="text-gray-400 dark:text-gray-300 truncate">{data.account.registered ? 'Yes' : 'No'}</p>
            <span class="text-gray-500 text-xs">Registration Date</span>
            <p class="text-gray-400 dark:text-gray-300 truncate">{data.account.registered_timestamp ? new Date(Number(data.account.registered_timestamp)) : 'Unregistered'}</p>
            <span class="text-gray-500 text-xs">Total Trades</span>
            <p class="text-gray-400 dark:text-gray-300 truncate"><!--{data.account.trades.length}-->Coming soon tm</p>
            <span class="text-gray-500 text-xs">Total Listings</span>
            <p class="text-gray-400 dark:text-gray-300 truncate"><!--{data.account.listings.length}-->Coming soon tm</p>
            <span class="text-gray-500 text-xs">Total Assets</span>
            <p class="text-gray-400 dark:text-gray-300 truncate">{data.account.assets.length}</p>
          </div>
        </div>

        <!--
        <div class="pt-6 pb-4 lg:col-span-2 lg:col-start-1 lg:pt-8 lg:pb-8 ">
          <div>
            <h3 class="font-medium text-gray-400">Raw JSON</h3>
            <div class="rounded-lg overflow-hidden mt-4">
              <div class="overflow-x-auto overflow-y-auto max-h-60">
                <code class="text-xs sm:text-base inline-flex text-left items-center space-x-4 bg-gray-800 text-gray-500 p-4 pl-6">
                  <span class="flex-1">
                    <pre class="">{JSON.stringify(data, null, 2)}</pre>
                  </span>
                  <span class="flex gap-4">
                  </span>
                  <svg class="self-start shrink-0 h-5 w-5 transition text-gray-500 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z"></path>
                      <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z"></path>
                  </svg>
                </code>
              </div>
            </div>
            <p class="text-xs text-gray-500 mt-2">Due to the NFT node needing some time to update, the information displayed here may not be up to date.</p>
          </div>
        </div>
        -->
      </div>
    </div>
  </div>
  <div id="owned">
    {#if data.account.assets.length === 0}
      <p class="text-center mt-4">Hmm, you don't seem to have any NFTs (or perhaps you've listed them all)! Why not go to the <a class="link" href="/market">market</a> and stock back up?</p>
    {/if}
    <AddressNfts owned={true} assets={data.account.assets} totalAssets={data.account.assets.length}/>
  </div>
{:else}
  <p class="mb-2"><span class="text-red-500">Error:</span> {data.message}</p>
{/if}
