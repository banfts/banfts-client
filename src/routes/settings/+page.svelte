<script>
  import { currency } from '$lib/services/stores.js';
  import { getPrice } from '$lib/services/price.js';

  export let data;
</script>

{#if data.success}
  <div class="flex flex-col min-h-full bg-base-300 rounded-box shadow mt-4 p-4">
    <h1 class="text-4xl">Settings</h1>
    <div class="mt-4">
      <label class="text-gray-500 text-xs block mb-1" for="currency">Currency: </label>
      <select id="currency" class="select select-bordered join-item" bind:value={$currency} on:change={getPrice}>
        <option disabled>Choose Currency</option>
        <option value="usd" selected={$currency === "usd"}>USD</option>
        <option value="eur" selected={$currency === "eur"}>EUR</option>
        <option value="gbp" selected={$currency === "gbp"}>GBP</option>
        <option value="cad" selected={$currency === "cad"}>CAD</option>
        <option value="vnd" selected={$currency === "vnd"}>VND</option>
        <option value="inr" selected={$currency === "inr"}>INR</option>
        <option value="jpy" selected={$currency === "jpy"}>JPY</option>
        <option value="btc" selected={$currency === "btc"}>BTC</option>
        <option value="eth" selected={$currency === "eth"}>ETH</option>
      </select>
    </div>
  </div>
{:else}
  <p class="mb-2"><span class="text-red-500">Error:</span> {data.message}</p>
{/if}
