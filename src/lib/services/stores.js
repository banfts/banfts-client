import { browser } from '$app/environment';
import { writable } from "svelte/store";;

const storageSessionAddress = browser ? window.localStorage.getItem('sessionAddress') ?? "" : "";
export const sessionAddress = writable(storageSessionAddress);

const sessionLoginTimestamp = browser ? window.localStorage.getItem('loginTimestamp') ?? 0 : 0;
export const loginTimestamp = writable(sessionLoginTimestamp);

sessionAddress.subscribe(value => {
  if (browser) {
    window.localStorage.setItem("sessionAddress", value ? value : "");
  }
});

loginTimestamp.subscribe(value => {
  if (browser) {
    window.localStorage.setItem("loginTimestamp", value ? value : 0);
  }
});

const sessionCurrency = browser ? window.localStorage.getItem('currency') ?? "usd" : "usd";
export const currency = writable(sessionCurrency);

currency.subscribe(value => {
  if (browser) {
    window.localStorage.setItem("currency", value ? value : "usd");
  }
});
