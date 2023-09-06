import bananojs from '@bananocoin/bananojs';

import { BANANO_PREFIX } from '$lib/config/constants.js';

bananojs.Main.setBananodeApiUrl('https://kaliumapi.appditto.com/api')

export function getAccount(publicKey) {
  return bananojs.BananoUtil.getAccount(publicKey, BANANO_PREFIX);
}

export function getAccountPublicKey(address) {
  return bananojs.BananoUtil.getAccountPublicKey(address);
}

export function verifyAddress(address, verbose = false) {
  const verifiedAddress = bananojs.BananoUtil.getBananoAccountValidationInfo(address);
  return verbose === true ? verifiedAddress : verifiedAddress.valid;
}

export function hexToBytes(hex) {
  return bananojs.BananoUtil.hexToBytes(hex);
}

export async function getAccountInfo(publicKey) {
  return await bananojs.BananodeApi.getAccountInfo(publicKey, BANANO_PREFIX);
}
