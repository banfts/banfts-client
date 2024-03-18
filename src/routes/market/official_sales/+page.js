import { API_URL } from '$lib/config/constants.js';

export const ssr = false;

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  const resp = await (await fetch(`${API_URL}/official_sales`)).json();
  return {
    official_sales: resp.official_sales,
  };
}
