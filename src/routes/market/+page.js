import { API_URL, PER_PAGE } from '$lib/config/constants.js';

export const ssr = false;

export async function load({ fetch }) {
  const resp = await (await fetch(`${API_URL}/market/listings?per_page=${PER_PAGE}`, {
    credentials: 'include',
  })).json();

  if (!resp.success) {
    return {
      found: false,
      message: resp.message,
    };
  }

  return {
    found: true,
    listings: resp.listings, //just returns a singular supply asset, to be clear
  };
}
