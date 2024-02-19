<script>
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>{$page.status}</title>
</svelte:head>

<div class="w-full text-center mt-[22vh]">
  <h1 class="text-9xl">{$page.status}</h1>
  <p>{$page.error?.message}</p>
</div>
