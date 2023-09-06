// import { error } from '@sveltejs/kit';

import { API_URL, IPFS_GATEWAY } from '$lib/config/constants.js';

import { accountToIpfsCid } from '$lib/utils/ipfs.js';
import { validateHexHash } from '$lib/utils/validate.js';

export const ssr = false;

/** @type {import('./$types').PageLoad} */
export async function load({ url, fetch }) {
  const mintHash = url.searchParams.get("mint_hash");
  if (!validateHexHash(mintHash)) {
    return {
      mint_hash: mintHash,
      found: false,
      message: 'Invalid mint hash',
    };
  }

  const resp = await (await fetch(`${API_URL}/assets/${mintHash}`)).json();
  if (!resp.success) {
    return {
      mint_hash: mintHash,
      found: false,
      message: resp.message,
    };
  }

  const metadataRepresentativeIpfsCid = accountToIpfsCid(resp.assets.asset.metadata_representative)

  let metadataRepresentativeData = {}
  if (metadataRepresentativeIpfsCid) {
    const metadataResponse = await (await fetch(`https://ipfs.io/ipfs/${metadataRepresentativeIpfsCid}`)).json();
    console.log(metadataResponse.image)
    if (!metadataResponse) {
      return {
        mint_hash: mintHash,
        found: false,
        message: 'Metadata representative not found',
      };
    }
    metadataRepresentativeData = { ...metadataResponse }

  }

  //console.log(metadataRepresentativeIpfsCid)
  return {
    mint_hash: mintHash,
    asset_representative: resp.assets.assetRep,
    found: true,
    asset: resp.assets.asset, //just returns a singular asset, to be clear
    asset_metadata: {...metadataRepresentativeData, ... { image_url: `${IPFS_GATEWAY}/${metadataRepresentativeData.image}` }}
  };
}
