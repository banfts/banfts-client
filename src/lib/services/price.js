import { get } from 'svelte/store';

import { currency } from '$lib/services/stores.js';

let currencyPerBanano = 0;

const currencySymbols = {
  usd: '$',
  eur: '€',
  gbp: '£',
  cad: '$',
  vnd: 'đ',
  inr: '₹',
  jpy: '¥',
  mxn: '$',
  try: '₺',
  btc: '₿',
  eth: 'Ð',
};

export async function getPrice() {
  currencyPerBanano = (await (await fetch("https://api.coingecko.com/api/v3/coins/banano")).json()).market_data.current_price[get(currency)];
}

export function getCurrencyString(banano) {
  const currencyName = get(currency);
  if (currencyName === "eth" || currencyName === "btc") {
    return `${currencySymbols[currencyName]}${Math.floor(currencyPerBanano*banano*(10**7))/(10**7)}~ ${currencyName.toUpperCase()}`;
  } else {
    return `${currencySymbols[currencyName]}${Math.floor(currencyPerBanano*banano*100)/100}~ ${currencyName.toUpperCase()}`;
  }
}

getPrice();

