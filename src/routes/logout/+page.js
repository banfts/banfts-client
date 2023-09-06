import { goto } from '$app/navigation';

import { API_URL } from '$lib/config/constants.js';
import { sessionAddress, loginTimestamp } from '$lib/services/stores.js';

export const ssr = false;

export async function load({ fetch }) {
  const resp = await (await fetch(`${API_URL}/auth/logout`, {
    credentials: 'include',
    method: 'POST',
  })).json();

  if (resp.success) {
    sessionAddress.set("");
    loginTimestamp.set(0);
  }

  await goto("/");
}

