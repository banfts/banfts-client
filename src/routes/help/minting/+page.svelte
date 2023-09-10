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
  <b>Notes:</b>
  <p>The 'Automatic First Mint' option automatically mints the NFT right after the supply block that declares the NFT. You should check this if you are minting several NFTs on the same account consecutively, as the first block after the NFT supply block must be the first mint of the NFT.</p>
</div>
