// import { error } from '@sveltejs/kit';
import { API_URL } from '$lib/config/constants.js';
import { validateHexHash } from '$lib/utils/validate.js';

export const ssr = false;

/** @type {import('./$types').PageLoad} */
export async function load({ url, fetch }) {
  const mintHash = url.searchParams.get("mint_hash");

  if (!validateHexHash(mintHash)) {
    return {
      mint_hash: mintHash,
      found: false,
      message: 'Invalid mint hash',
    };
  }

  const resp = await (await fetch(`${API_URL}/assets/${mintHash}`)).json();
  if (!resp.success) {
    return {
      mint_hash: mintHash,
      found: false,
      message: resp.message,
    };
  }

  return {
    mint_hash: mintHash,
    found: true,
    info: resp.assets, //just returns a singular asset, to be clear
  };
}
