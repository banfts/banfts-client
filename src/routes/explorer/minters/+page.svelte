<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  import ExternalLink from '$lib/components/ExternalLink.svelte';
  import SupplyCard from '$lib/components/SupplyCard.svelte';

  export let data;

  onMount(() => {
    if (navigator?.clipboard) {
      document.getElementById("copy-address").onclick = () => {
        navigator.clipboard.writeText(data.address);
      };
    }
  });
</script>

{#if data.found}
  <div class="flex flex-col min-h-full bg-base-300 rounded-box shadow mt-4">
    <div class="flex justify-between w-full items-center space-x-2 py-2 px-3 lg:py-3 lg:px-8">

      <div class="flex-none avatar">
        <div class="w-8 my-auto bg-neutral rounded">
          <img src="https://monkey.banano.cc/api/v1/monkey/{data.address}" alt="{data.address} MonKey"/>
        </div>
      </div>
      <div class="flex-1 max-w-full overflow-hidden">
      
        <h1 class="me-auto text-lg font-light tracking-tight text-gray-400 sm:text-xl truncate">{data.address}</h1>
      </div>
      <div class="flex-none self-center">
        <ul>
          <li class="tooltip tooltip-bottom" data-tip="Copy to clipboard">
            <button id="copy-address" class="btn btn-ghost btn-sm btn-circle" href="#">
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
          <img src="https://monkey.banano.cc/api/v1/monkey/{data.address}" alt="{data.address} MonKey" class="w-5/6 object-cover object-center">
        </div>

        <div class="mt-4 lg:row-span-1 lg:mt-0">
          <h2 class="sr-only">Account Information</h2>
          <p class="text-3xl tracking-tight text-gray-400 dark:text-gray-300 mb-4">{data.info.name}</p>

          <div>
            <h3 class="sr-only">Description</h3>
            <div class="space-y-6">
              <p class="text-base text-gray-400">{data.info.description ? data.info.description : "No description"}</p>
            </div>
          </div>

          <div class="mt-8">
            <a class="btn btn-primary btn-block" href="#supply">Scroll To Supply NFTs</a>
          </div>
          <div class="mt-8">
            <h3 class="font-medium text-gray-400 mb-2">Details</h3>
            <span class="text-gray-500 text-xs">Owned NFTs</span>
            <p class="text-gray-400 dark:text-gray-300 truncate"><a class="link" href="/explorer/addresses?address={data.address}">Click Here</a></p>
            <span class="text-gray-500 text-xs">External Link</span>
            <p class="text-gray-400 dark:text-gray-300 truncate">
              {#if data.info.external_url}
                <ExternalLink url={data.info.external_url} content="{data.info.external_url}"/>
              {:else}
                No external link
              {/if}
            </p>
            <span class="text-gray-500 text-xs">Total Supply NFTs</span>
            <p class="text-gray-400 dark:text-gray-300 truncate">{data.supplies.length}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
 
  <div id="supply">
    {#if data.supplies.length === 0}
      <p class="text-center mt-4">This minter hasn't minted any NFTs yet</p>
    {/if}
    <div>
      <div class="my-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {#each data.supplies as supplyInfo}
          <SupplyCard {supplyInfo}/>
        {/each}
      </div>
    </div>
  </div>
{:else}
  <p><span class="text-red-500">Error:</span> {data.message}</p>
{/if}
