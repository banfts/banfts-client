import bananojs from '@bananocoin/bananojs';

import { BANANO_PREFIX } from '$lib/config/constants.js';

export function getAccount(publicKey) {
  return bananojs.BananoUtil.getAccount(publicKey, BANANO_PREFIX);
}

export function getAccountPublicKey(address) {
  return bananojs.BananoUtil.getAccountPublicKey(address);
}

export function hexToBytes(hex) {
  return bananojs.BananoUtil.hexToBytes(hex);
}
