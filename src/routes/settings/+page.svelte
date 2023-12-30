<script>
  import { currency } from '$lib/services/stores.js';
  import { getPrice } from '$lib/services/price.js';

  export let data;
</script>

<svelte:head>
  <title>Settings</title>
</svelte:head>

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
        <option value="mxn" selected={$currency === "mxn"}>MXN</option>
        <option value="try" selected={$currency === "try"}>TRY</option>
        <option value="btc" selected={$currency === "btc"}>BTC</option>
        <option value="eth" selected={$currency === "eth"}>ETH</option>
      </select>
    </div>
    <a href="/help/usage" class="label-text-alt link link-hover inline-flex mt-4">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 inline-block">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
      </svg>
      <span class="inline-block pl-0.5">Confused about how to use the site?</span>
    </a>
  </div>
{:else}
  <p class="mb-2"><span class="text-red-500">Error:</span> {data.message}</p>
{/if}
