import { validateHexHash } from '$lib/utils/validate.js';
import { API_URL } from '$lib/config/constants.js';
import { verifyAddress } from '$lib/services/banano.js';
import { sessionAddress } from '$lib/services/stores.js';
import { get } from 'svelte/store';

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

  const address = get(sessionAddress);
  const addressValid = verifyAddress(address, true);

  if (!addressValid) {
    return {
      success: false,
      message: "Address invalid, are you logged in?",
    };
  }
  
  const resp = await (await fetch(`${API_URL}/official_sales/${supplyHash}`)).json();

  if (!resp?.success) {
    return {
      success: false,
      message: "Error, official sale not found, or not logged in",
    };
  }

  /*
  {
    success,
    official_sale,
    asset_supply,
    send_address,
  }
  */
  return {
    ...resp,
  }
}
