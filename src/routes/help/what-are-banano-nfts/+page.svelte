<script>
  import ExternalLink from '$lib/components/ExternalLink.svelte';
  import HTSP from '$lib/images/how-to-send-popup.png';
</script>

<svelte:head>
  <title>Help: What are Banano NFTs?</title>
</svelte:head>

<h1 class="text-4xl mb-4">Help: What are Banano NFTs?</h1>

<p>If you've been following Banano news any time in the last few years, you may have heard about Banano NFTs. You might even own one! But in case you haven't looked into what they actually are, or how they work, we're here to help with a high level explanation.</p>

<h2 class="text-2xl mb-4">Smart Contracts vs. Meta Protocols</h2>

<img src="https://raw.githubusercontent.com/Airtune/73-meta-tokens/main/diagrams/supply-mint-send-receive.png" class="max-w-full" alt="A diagram showing the meta protocol"/>

<p><i>Diagram above made by Airtune.</i></p>

<p>First of all, let's clear up a common misconception. Yes, Banano does not have smart contracts, of any kind. Banano NFTs does not add a smart contract layer to Banano, and does not rely on smart contracts. Banano NFTs are actually native to the regular Banano network. It is a trustless, decentralized protocol - not just changing some numbers in a database (no shade, nanswap art). How is this possible without Banano having smart contracts?</p>

<p>Well, the Banano NFT protocol uses a <b>meta protocol</b>, <ExternalLink url="https://github.com/Airtune/73-meta-tokens" content="created by the wonderful Airtune"/>. A meta protocol is a set of rules we apply to data that is exchanged according to the rules of a different protocol. <b>To simply explain a meta protocol runs on top of a different protocol</b> (kind of like how the HTTP protocol runs on top of the TCP protocol), <b>and so then benefits from all the strengths of the underlying protocol</b>. In our case, running a meta protocol on Banano means we get to automatically enjoy <b>fast and feeless NFT transfers</b>! In addition, we get a way to not only store data, but prove that the data came from a specific person (by making blocks on the Banano network).</p>

<p>Now that the strengths of the Banano NFT protocol running on Banano instead of a different cryptocurrency with smart contracts is clear, let's talk about the downsides. Or I guess, downside (singular). Unlike smart contracts, figuring out who knows what NFTs, or even what NFTs exist is not exactly trivial.</p>
  
<p>If you wanted to know whether some address owns a particular NFT, with smart contracts, it would be incredibly simple to find out: simply call that NFT's smart contract's <code>balanceOf</code> (for ERC721 or ERC1155) function, and it will tell you right away.</p>

<p>On the other hand, for Banano NFTs, one would need to crawl from the minter account, note all the NFTs minted made by that minter, then track each one's chain of ownership. This isn't "hard", but you can see how it isn't as simple as with smart contract NFTs. We here at Banfts run our own crawler, but as there are many, many, NFTs we must crawl, <b>it can take some time after a transfer for it to reflect on our website, even though the NFTs are actually instantly transferred</b>. We are actively working on improvements to our crawler, like adding websocket support, in order to listen to transactions as they come, and instantly update the chain of ownership if a NFT is transferred.</p>

<h2 class="text-2xl mb-4">The Protocol Somewhat Hastily Explained</h2>

<p>It's time for a very brief explanation of the Banano NFT meta protocol. First, we upload the image and some metadata onto IPFS (which by the way, is also how other NFTs, including Ethereum NFTs, do it). Then, we can publish a supply block by changing our representative to a special address with some data encoded into it. Immediately after in the next block, we can change our representative to another special address, called the metadata representative. The metadata representative has the IPFS CID of the metadata we uploaded earlier encoded into it. You will notice that the Banano NFT Protocol frequently uses the representative field of blocks to store data. Anyways, now a NFT has been minted. Hurrah!</p>

<p>Sending the NFT is much simpler, luckily. All we have to do is change the representative to an "asset representative". This is just the hash of the mint block we just made in the last paragraph, as a Banano address.</p>

<img src={HTSP} alt="The 'How To Send' popup"/>

<p>That may sound complicated, but don't worry! This is exactly what this site, Banfts.com, is around for. <b>We make finding, sending, and trading NFTs very simple.</b> For example, to figure out how to send a NFT, just navigate to your <a href="/account">Accounts page</a>, and click the "How To Send" button on any of your NFTs. Easy-to-follow instructions will pop up! You can watch <a class="link" href="/help/usage">Yusuf's video</a> to learn more, and join our <a class="link" href="https://discord.gg/FDv3wpbyHS">Discord</a> if you have any questions.</p>

<h2 class="text-2xl mb-4">Related Links</h2>

<ul class="list-disc">
  <li><ExternalLink url="https://github.com/Airtune/73-meta-tokens" content="Airtune's Banano NFT Protocol"/></li>
  <li><ExternalLink url="https://docs.ipfs.tech/concepts/what-is-ipfs" content="What is IPFS?"/></li>
  <li><ExternalLink url="https://github.com/banfts/nft-crawler/blob/main/minters.json" content="List of (almost all) known minters"/></li>
  <li><ExternalLink url="https://github.com/banfts/nft-crawler" content="Banfts NFT crawler code"/></li>
  <li><ExternalLink url="https://github.com/Airtune/banano-nft-crawler" content="Airtune's crawler library That Our NFT crawler uses"/></li>
  <li><ExternalLink url="https://github.com/banfts/banfts-client" content="Banfts frontend code"/></li>
  <li><a class="link" href="/minting">Minting Banano NFTs</a></li>
</ul>

<!--my god I hate tailwind-->

<style>
  p, h2, img {
    margin-top: 15px;
  }
  ul {
    margin-left: 15px;
  }
</style>
