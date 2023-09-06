<script>
  import Mint from '$lib/components/assets/Mint.svelte';

  export let data;
</script>

{#if data.found}
  <Mint mintData={data}></Mint>
{:else}
  <p><span class="text-red-500">Error:</span> {data.message}</p>
{/if}
