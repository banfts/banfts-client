import { error } from '@sveltejs/kit';

import { validateBananoAddress } from '$lib/utils/validate.js';
import { API_URL } from '$lib/config/constants.js';

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
  const resp = await (await fetch(`${API_URL}/account/${address}/assets`)).json();
  if (!resp.success) {
    return {
      address,
      found: false,
      message: resp.message,
    };
  }
  return {
    address,
    found: true,
    info: resp.account,
  };
}
