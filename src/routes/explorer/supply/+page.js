import { error } from '@sveltejs/kit';

import { validateHexHash } from '$lib/utils/validate.js';
import { API_URL } from '$lib/config/constants.js';

export const ssr = false;

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
  const resp_count = await (await fetch(`${API_URL}/assets/supply/${supplyHash}/assets/count`)).json();
  if (!resp.success || !resp_count.success) {
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
    count: resp_count.count,
  };
}
