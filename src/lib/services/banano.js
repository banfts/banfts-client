import bananojs from '@bananocoin/bananojs';

import { BANANO_PREFIx } from '$lib/config/constants.js';

export function getAccount(publicKey) {
  return bananojs.BananoUtil.getAccount(publicKey, BANANO_PREFIx);
}

export function getAccountPublicKey(address) {
  return bananojs.BananoUtil.getAccountPublicKey(address);
}

export function hexToBytes(hex) {
  return bananojs.BananoUtil.hexToBytes(hex);
}
