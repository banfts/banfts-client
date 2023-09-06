import { error } from '@sveltejs/kit';

import { validateHexHash } from '$lib/utils/validate.js';
import { API_URL } from '$lib/config/constants.js';

/** @type {import('./$types').PageLoad} */
export async function load({ url, fetch }) {
  const supplyHash = url.searchParams.get("supply_hash");
  if (!validateHexHash(supplyHash)) {
    return {
      supply_hash: supplyHash,
      found: false,
      message: 'Invalid supply hash',
    };
  }
  const resp = await (await fetch(`${API_URL}/assets/supply/${supplyHash}`)).json();
  if (!resp.success) {
    return {
      supply_hash: supplyHash,
      found: false,
      message: resp.message,
    };
  }
  return {
    supply_hash: supplyHash,
    found: true,
    info: resp.assets, //just returns a singular supply asset, to be clear
  };
}
