<script>
  import ExternalLink from '$lib/components/ExternalLink.svelte';
  import MS1 from '$lib/images/message-signing-1.png';
  import MS2 from '$lib/images/message-signing-2.png';
  import MS3 from '$lib/images/message-signing-3.png';
</script>

<!-- TODO: Move this to docs page? -->

<h1 class="text-4xl mb-4">Help: Logging In With Message Signing</h1>

<p class="my-4">
  Have no clue what message signing is, or how to do it? No worries! We got you covered with this quick guide.
</p>

<p class="my-4">
  First of all, what is message signing? Message signing is a new way to <b>cryptographically prove that you own the address you claim to own</b>. Essentially, some websites, including this one, as a way to log in with your Banano address, without having to send any transactions! Sounds convenient, right?
</p>

<p class="my-4">
  At the time of writing, only the Bananostand wallet supports message signing. So, you will have to first go to <ExternalLink url="https://bananostand.com" content="https://bananostand.com"/>, and import in your seed - or create a new one (if so, make sure to write down your seed, otherwise you may lose your funds, and NFTs, if you lose the seed).
</p>

<p class="my-4">
  Next, go to the <a class="link" href="/" target="_blank">Banfts main page</a>, and click "Auth With Signature". Enter/paste in the Banano address you want to log in with (the address on your Bananostand wallet).
</p>

<p class="my-4">
  Then, look for the Bananostand link. Click it, and unlock your wallet to proceed to the message signing page.
</p>

<img src={MS1} class="max-w-3xl" alt="a screenshot of the above instruction"/>

<p class="my-4"> 
  Now, click "Sign". You're almost done!
</p>

<img src={MS2} class="max-w-3xl" alt="a screenshot of the above instruction"/>

<p class="my-4">
  Copy the resulting signature.
</p>

<img src={MS3} class="max-w-3xl" alt="a screenshot of the above instruction"/>

<p class="my-4">
  Go back to the Banfts login page, and paste in the copied signature into the signature input. Click "Login", wait a second or two, and you should be logged in. You will be automatically redirected to https://banfts.com/account.
</p>

<p class="my-4">
  Message signing is <b>safe</b>, and <b>does not</b> allow others to send transactions on your behalf, or otherwise compromise your security. That being said, if you share your signature with other people (besides the website that requested it), they might be able to use the signed message to log in to your account! So please do not share the signature with others.
</p>
