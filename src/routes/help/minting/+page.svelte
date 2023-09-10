<script>
  import ExternalLink from '$lib/components/ExternalLink.svelte';
</script>

<div class="p-2">
  <b>Things to check before <a class="link" href="/minting">minting</a>:</b>
  <ul class="list-disc pl-4">
    <li>Do you have your key and secret from <ExternalLink url="https://pinata.cloud" content="https://pinata.cloud"/>?</li>
    <li>Did you upload a file?</li>
    <li>Check for trailing spaces</li>
    <li>Make sure account is opened</li>
    <li>Are all fields filled?</li>
    <li>Check the developer console for any errors</li>
    <li>Make sure 'pinfile' and 'pinjson' endpoint permissions were allowed in pinata</li>
    <li>Check for pinata keys unlimited uses</li>
    <li>Make sure to contact me (Prussia) after minting, I will need to whitelist the minting address</li>
  </ul>
  <div class="mt-2 [&>*]:mb-2">
    <b>Notes:</b>
    <p>The 'Automatic First Mint' option automatically mints the NFT right after the supply block that declares the NFT. You should check this if you are minting several NFTs on the same account consecutively, as the first block after the NFT supply block must be the first mint of the NFT.</p>
    <p>It is best use a new, dedicated seed (without your personal Banano address on it), to mint NFTs. You can also consider getting a vanity address as your minter address.</p>
    <p>All code is run client-side, so your seed, API key, etc will not be shown to the server. To be extra sure though, we still recommend you run this locally for security reasons.</p>
    <p>Additionally, we <b>highly recommend</b> making sure any uploaded images are <b>less than 500kb in size</b>, as any larger than that size will take a long time to load on the site, and gobble up user's bandwidth.</p>
  </div>
</div>
