// import { error } from '@sveltejs/kit';

import { API_URL } from '$lib/config/constants.js';

//import { accountToIpfsCid } from '$lib/utils/ipfs.js';
import { verifyAddress, getAccountInfo } from '$lib/services/banano.js';

export const ssr = false;

/** @type {import('./$types').PageLoad} */
export async function load({ url, fetch }) {
  const queryAddress = url.searchParams.get("address");
  const queryAddressValid = verifyAddress(queryAddress, true)
  if (!queryAddressValid.valid) {
    return {
      accountAddress: queryAddress,
      success: false,
      message: queryAddressValid.message,
    };
  }
  const getAccountNodeResponse = await getAccountInfo(queryAddress); // <-- The culprit
  console.log(getAccountNodeResponse)
  if (Number(getAccountNodeResponse.block_count) === 0) {
    return {
      accountAddress: queryAddress,
      success: false,
      message: 'Unopened account',
    };
  }
  const getAccountResponse = await (await fetch(`${API_URL}/account/${queryAddress}`)).json();
  if (!getAccountResponse.success) {
    return {
      accountAddress: queryAddress,
      success: false,
      message: getAccountResponse.message,
    };
  }
  const getAccountAssetsResponse = await (await fetch(`${API_URL}/account/${queryAddress}/assets`)).json();
  if (!getAccountAssetsResponse.success) {
    return {
      accountAddress: queryAddress,
      success: false,
      message: getAccountAssetsResponse.message,
    };
  }
  //console.log({ ...getAccountResponse.account, ...getAccountAssetsResponse.account, ...getAccountNodeResponse })
  return {
    success: true,
    account: { ...getAccountResponse.account, ...getAccountAssetsResponse.account, /*network: getAccountNodeResponse*/ },
  };
}
