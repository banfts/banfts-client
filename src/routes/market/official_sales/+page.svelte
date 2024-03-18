<script>
  import OfficialSaleCard from '$lib/components/OfficialSaleCard.svelte';

  export let data;

  let official_sales = data.official_sales;
</script>

<svelte:head>
  <title>Official Sales</title>
</svelte:head>

<div class="flex flex-col w-full bg-base-300 rounded-box shadow p-4 my-4">
  <div class="mb-2 mx-auto">
    <div class="text-center mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-400 mb-2">Official Sales</h1>
      <p class="small text-gray-600">Buy directly from artists! Under construction 🚧, pardon the dust!</p>
    </div>
  </div>

  <div class="divider"></div> 

  {#if official_sales.length == 0}
    <p class="max-w-full sm:px-4 lg:px-8">Looks like there's nothing here yet 👀. Stay tuned for official sales dropping soon! Please join our Discord if you are interested in becoming an official artist.</p>
  {/if}
  <div class="flex flex-col justify-between lg:h-full max-w-full px-4 pb-4 sm:px-6 lg:px-8">
    <div class="my-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {#each official_sales as official_sale}
        <OfficialSaleCard {official_sale}/>
      {/each}
    </div>
  </div>
</div>
