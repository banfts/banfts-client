import { error } from '@sveltejs/kit';

import { validateHexHash } from '$lib/utils/validate.js';
import { API_URL } from '$lib/config/constants.js';

export let ssr = false;

/** @type {import('./$types').PageLoad} */
export async function load({ url, fetch }) {
  const mintHash = url.searchParams.get("mint_hash");
  if (!validateHexHash(mintHash)) {
    return {
      mint_hash: mintHash,
      found: false,
      message: 'Invalid supply hash',
    };
  }
  const resp = await (await fetch(`${API_URL}/market/listings/${mintHash}`, {
    credentials: 'include',
  })).json();
  if (!resp.success) {
    return {
      mint_hash: mintHash,
      found: false,
      message: resp.message,
    };
  }
  if (!resp.market.listed) {
    return {
      mint_hash: mintHash,
      found: false,
      message: 'There is currently no listing for this nft, or no nft with this mint hash exist',
    };
  }
  const supplyResp = await (await fetch(`${API_URL}/assets/supply/${resp.market.listing.supply_hash}`)).json();
  return {
    mint_hash: mintHash,
    found: true,
    info: supplyResp.assets,
    listing: resp.market.listing, //just returns a singular supply asset, to be clear
  };
}
