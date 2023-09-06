<script>
  import { ONE_DAY_MS } from '$lib/config/constants.js';
  import { sessionAddress, loginTimestamp } from '$lib/services/stores.js';
</script>

<div class="flex flex-grow my-4">
  <div class="hero min-h-full bg-base-300 rounded-box shadow">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Banfts Marketplace</h1>
        <p class="py-6">Buy and sell Banano NFTs securely and effortlessly! No registration required.</p>
        {#if $sessionAddress.startsWith("ban_")}
          {#if $loginTimestamp > Date.now() - ONE_DAY_MS}
            <p class="pb-6 text-green-400">You appear to be already logged in.</p>
          {/if}
        {/if}
        <!-- HBB, when you implement rep auth, feel free remove the `disabled` ofc - prussia -->
        <a class="btn btn-primary btn-sm" href="/auth/representative" disabled>Auth with representative</a>
        <a class="btn btn-primary btn-sm" href="/auth/signature">Auth with signature</a>
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  /* :global(html) {
    background-color: theme("colors.gray.100");
  } */
</style>
