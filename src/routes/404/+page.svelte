<!-- 404 page will work in /asdfdasf but not /asdfasdf/adsf, because I can't figure out how to get sveltekit to use absolute urls (/_app) instead of relative urls (./_app) -->

<svelte:head>
  <title>404</title>
</svelte:head>

<div class="w-full text-center mt-[22vh]">
  <h1 class="text-9xl">404</h1>
  <p>Page Not Found</p>
</div>
