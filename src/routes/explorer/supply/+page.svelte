<script>
  import Supply from '$lib/components/assets/Supply.svelte';

  export let data;

  console.log(data);
</script>

{#if data.found}
  <Supply supplyInfo={data.info}></Supply>
{:else}
  <p><span class="text-red-500">Error:</span> {data.message}</p>
{/if}
