/*
{
  './+layout.svelte': [Function: ./+layout.svelte],
  './+page.svelte': [Function: ./+page.svelte],
  './message-signing/+page.svelte': [Function: ./message-signing/+page.svelte],
  './minting/+page.svelte': [Function: ./minting/+page.svelte],
  './usage/+page.svelte': [Function: ./usage/+page.svelte]
}
*/
//import.meta.glob gets something like the above ^
//get the subdirectories
const help_pages = Object.keys(import.meta.glob("./**")).map((p) => p.split("/")[1]).filter((p) => !p.includes("."));

//ssr is on
export const ssr = true;

/** @type {import('./$types').PageLoad} */
export async function load() {
  return {
    help_pages,
  };
}
