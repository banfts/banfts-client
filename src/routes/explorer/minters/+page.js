import { error } from '@sveltejs/kit';

import { validateBananoAddress } from '$lib/utils/validate.js';
import { API_URL } from '$lib/config/constants.js';

// So query params can be looked at in load()
export const ssr = false;

/** @type {import('./$types').PageLoad} */
export async function load({ url, fetch }) {
  const address = url.searchParams.get("address");

  if (!validateBananoAddress(address)) {
    return {
      address,
      found: false,
      message: 'Invalid Banano address',
    };
  }

  const minterResp = await (await fetch(`${API_URL}/minters/${address}`)).json();
  if (!minterResp.success) {
    return {
      address,
      found: false,
      message: minterResp.message,
    };
  }

  const minterSuppliesResp = await (await fetch(`${API_URL}/minters/${address}/supply`)).json();
  if (!minterSuppliesResp.success) {
    return {
      address,
      found: false,
      message: minterSuppliesResp.message,
    };
  }

  return {
    address,
    found: true,
    info: minterResp.minters.minter,
    supplies: minterSuppliesResp.minters.supply,
  };
}
