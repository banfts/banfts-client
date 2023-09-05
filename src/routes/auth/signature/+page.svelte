<script>
  import { goto } from '$app/navigation';
  import { API_URL } from '$lib/config/constants.js';
  import ExternalLink from '$lib/components/ExternalLink.svelte';

  let signedMessage = "message-banfts-auth-"+Date.now();

  let address;
  let signature;

  let loginError = false;

  async function signatureLogin() {
    const resp = await (await fetch(`${API_URL}/auth/signature`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address,
        signature,
        signedMessage,
      })
    })).json();

    if (resp.success) {
      await goto("/market?login=true");
    } else {
      loginError = true;
    }
  }
</script>

<div class="flex flex-grow my-4">
  <div class="hero min-h-screen bg-base-300">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">Authenticate to Banfts!</h1>
        <p class="py-6">Sign the following message: <code>{signedMessage}</code>. <ExternalLink url="https://thebananostand.com/signing?request=message_sign&address={address}&message={signedMessage}" content="Click here to sign the message with Bananostand"/>.</p>
      </div>
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div class="card-body">
          <div class="form-control">
            <label class="label" for="address">
              <span class="label-text">Address</span>
            </label>
            <input id="address" type="text" bind:value={address} placeholder="ban_..." class="input input-bordered{ loginError ? ' input-error' : '' }" />
          </div>
          <div class="form-control">
            <label class="label" for="signature">
              <span class="label-text">Signature</span>
            </label>
            <input id="signature" type="text" bind:value={signature} placeholder="Signature here..." class="input input-bordered{ loginError ? ' input-error' : '' }" />
            <label class="label">
              <a href="#" class="label-text-alt link link-hover">Not sure how to sign a message?</a>
            </label>
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-primary" on:click={signatureLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
