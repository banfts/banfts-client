<script>
  import AddressNfts from '$lib/components/AddressNfts.svelte';
  import ExternalLink from '$lib/components/ExternalLink.svelte';

  export let data;
</script>

<div class="flex flex-col w-full bg-base-300 rounded-box shadow my-4">
  <div class="mb-2 mx-auto">
    <div class="text-center mx-auto max-w-screen-sm px-4 py-6 sm:px-6 lg:px-8 text-ellipsis">
      <h1 class="text-3xl font-bold tracking-tight text-gray-400 mb-2"><ExternalLink url="https://creeper.banano.cc/account/{data.address}" content="{data.address.replace(data.address.slice(10, -4), "...")}"/></h1>
    </div>
  </div>
</div>

<AddressNfts owned={false} assets={data.info.assets} totalAssets={data.info.assets.length}/>
