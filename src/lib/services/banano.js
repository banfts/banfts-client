import { postRequest } from '$lib/services/external.js';

import { BANANO_PREFIX, RPC_URL } from '$lib/config/constants.js';

import bananojs from '@bananocoin/bananojs';

//can be used to get asset rep if mint hash is the public key
export function getAccount(publicKey) {
  return bananojs.BananoUtil.getAccount(publicKey, BANANO_PREFIX);
}

export function getAccountPublicKey(address) {
  return bananojs.BananoUtil.getAccountPublicKey(address);
}

export function hexToBytes(hex) {
  const hexChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
  let bytes = new Uint8Array(Math.floor(hex.length/2));
  for (let i=0; i < hex.length/2; i++) {
    bytes[i] = hexChars.indexOf(hex[i*2])*16+hexChars.indexOf(hex[i*2+1]);
  }
  return bytes;
}

// Does not validate checksum
export function verifyAddress(address) {
  return /ban_[13][13456789abcdefghijkmnopqrstuwxyz]{59}\b/.test(address);
}

export async function getAccountInfo(account) {
  return await postRequest(RPC_URL, {
    action: 'account_info',
    account,
  });
}
