<script>
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import "../app.css";
</script>

<div class="flex flex-col min-h-screen p-4">
	<Header />

	<main class="flex flex-grow">
		<slot />
	</main>

	<Footer />
</div>