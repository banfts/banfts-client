// import { error } from '@sveltejs/kit';

import { get } from 'svelte/store';

import { verifyAddress } from '$lib/services/banano.js';
import { sessionAddress } from '$lib/services/stores.js';

/** @type {import('./$types').PageLoad} */
export async function load({ url, fetch }) {
  const address = get(sessionAddress);

  const addressValid = verifyAddress(address, true)
  if (!addressValid) {
    return {
      success: false,
      accountAddress: address,
      message: "Address invalid, are you logged in?",
    };
  }

  return {
    success: true,
  };
}
