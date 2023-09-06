import { API_URL, PER_PAGE } from '$lib/config/constants.js';

export const ssr = false;

export async function load({ fetch, url }) {
  const resp = await (await fetch(`${API_URL}/market/listings?per_page=${PER_PAGE}`, {
    credentials: 'include',
  })).json();

  const seller = url.searchParams.get("seller");
  const supplyHash = url.searchParams.get("supply_hash");
  const maxAskPrice = url.searchParams.get("max_askk_price");

  if (!resp.success) {
    return {
      found: false,
      message: resp.message,
    };
  }

  return {
    found: true,
    listings: resp.listings, //just returns a singular supply asset, to be clear
    query: {
      seller,
      supplyHash,
      maxAskPrice,
    },
  };
}
