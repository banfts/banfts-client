// import { error } from '@sveltejs/kit';

import { API_URL } from '$lib/config/constants.js';
import { get } from 'svelte/store';
import { verifyAddress, getAccountInfo } from '$lib/services/banano.js';
import { sessionAddress } from '$lib/services/stores.js';

export const ssr = false;

/** @type {import('./$types').PageLoad} */
export async function load({ url, fetch }) {
  const address = get(sessionAddress);

  const addressValid = verifyAddress(address, true)
  if (!addressValid) {
    return {
      accountAddress: address,
      success: false,
      message: "Address invalid, are you logged in?",
    };
  }

  const getAccountNodeResponse = await getAccountInfo(address); // <-- The culprit
  if (Number(getAccountNodeResponse.block_count) === 0) {
    return {
      accountAddress: address,
      success: false,
      message: 'Unopened account',
    };
  }

  const getAccountResponse = await (await fetch(`${API_URL}/account/${address}`)).json();
  if (!getAccountResponse.success) {
    return {
      accountAddress: address,
      success: false,
      message: getAccountResponse.message,
    };
  }

  const getAccountAssetsResponse = await (await fetch(`${API_URL}/account/${address}/assets`)).json();
  if (!getAccountAssetsResponse.success) {
    return {
      accountAddress: address,
      success: false,
      message: getAccountAssetsResponse.message,
    };
  }

  //console.log({ ...getAccountResponse.account, ...getAccountAssetsResponse.account, ...getAccountNodeResponse })
  return {
    success: true,
    account: { ...getAccountResponse.account, ...getAccountAssetsResponse.account, network: getAccountNodeResponse },
  };
}
