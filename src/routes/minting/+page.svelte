<script>
  import { onMount } from 'svelte';
  // This is an adaption of the code I write at https://github.com/jetstream0/Banano-NFTs-Client/blob/main/serve/mint.html -prussia

  let mintSuccess = false;
  let mintFailure = false;
  let nftRep;

  let apiKey;
  let apiSecret;
  let fileInput;
  let supply;
  let seed;
  let name;
  let description;
  let firstMint = true;

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Probably like the twentieth bytes to hex function I have written... exciting. -prussia
  function uint8ToHex(uint8) {
    const hexChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
    let hex = "";
    for (let i = 0; i < uint8.length; i++) {
      hex += hexChars[Math.floor(uint8[i] / 16)];
      hex += hexChars[uint8[i] % 16];
    }
    return hex;
  }

  async function pinJson(jsonData) {
    let jsonResp = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
      method: 'POST',
      body: JSON.stringify(jsonData),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        pinata_api_key: apiKey,
        pinata_secret_api_key: apiSecret
      }
    });
    jsonResp = await jsonResp.json();
    console.log(jsonResp);
    if (jsonResp.IpfsHash) {
      return jsonResp.IpfsHash;
    } else {
      return false;
    }
  }

  async function pinImages() {
    //get image
    let file = fileInput.files[0];
    let data = new FormData();
    //pin to ipfs using pinata api
    //stream()
    data.append('file', file, 'ban_nft.png');
    data.append('pinataOptions', JSON.stringify({cidVersion: 0}));
    let imgResp = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: 'POST',
      body: data,
      headers: {
        //'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: apiKey,
        pinata_secret_api_key: apiSecret
      }
    });
    imgResp = await imgResp.json();
    console.log(imgResp);
    if (imgResp.IpfsHash) {
      return imgResp.IpfsHash;
    } else {
      return false;
    }
  }

  onMount(() => {
    // I hate this
    setTimeout(() => {
      window.bananocoinBananojs.setBananodeApiUrl('https://kaliumapi.appditto.com/api');
      console.log(window.bananocoinBananojs, from_b58);
      document.getElementById("mint-button").disabled = false;
    }, 1000);

    async function mint() {
      seed = seed.trim();
      let address = await window.bananocoinBananojs.getBananoAccountFromSeed(seed, 0);
      if (!address) {
        //ERROR
        mintFailure = true;
        return;
      }
      //create supply block by creating public key
      //get versions
      let majorVersion = 1;
      let mvPub = majorVersion.toString(16);
      mvPub = "0".repeat(10-mvPub.length)+mvPub;
      let minorVersion = 0;
      let mnPub = minorVersion.toString(16);
      mnPub = "0".repeat(10-mnPub.length)+mnPub;
      let patchVersion = 0;
      let ptPub = patchVersion.toString(16);
      ptPub = "0".repeat(10-ptPub.length)+ptPub;
      //get supply
      let supplyPub = Number(supply).toString(16);
      supplyPub = "0".repeat(16-supplyPub.length)+supplyPub;
      let sPubKey = '51BACEED6078000000'+mvPub+mnPub+ptPub+supplyPub;
      let supplyRep = window.bananocoinBananojs.getBananoAccount(sPubKey);
      //SET REP, which creates the supply block
      await sleep(500);
      let supplyBlockHash = await window.bananocoinBananojs.changeBananoRepresentativeForSeed(seed, 0, supplyRep);
      //upload images
      let imgHash = await pinImages();
      if (!imgHash) {
        //ERROR
        mintFailure = true;
        return;
      }
      await sleep(500);
      //create json text
      let jsonInfo = {};
      jsonInfo.name = name;
      jsonInfo.image = imgHash;
      jsonInfo.description = description;
      jsonInfo.properties = {
        issuer: address,
        supply_block_hash: supplyBlockHash
      };
      console.log(jsonInfo);
      let jsonHash = await pinJson(jsonInfo);
      if (!jsonHash) {
        //ERROR
        mintFailure = true;
        return;
      }
      //cid to account
      let MAP = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"; 
      let decoded = uint8ToHex(from_b58(jsonHash, MAP)).toUpperCase(); 
      //remove 1220
      let nftRepPub = decoded.slice(4);
      let nftRepAddr = window.bananocoinBananojs.getBananoAccount(nftRepPub);
      if (firstMint) {
        await window.bananocoinBananojs.changeBananoRepresentativeForSeed(seed, 0, nftRepAddr);
      }
      mintFailure = false;
      mintSuccess = true;
      nftRep = nftRepAddr;
    }

    document.getElementById("mint-button").onclick = mint;
  });
</script>

<svelte:head>
  <title>Minting Tool</title>
  <script src="/modules/banano.js"></script>
  <script src="/modules/b58.js"></script>
</svelte:head>

<!--
  Name, Image, Animation Url (optional), Description, Seed, Supply, Pinata Api Key
  With seed, send supply block. Then upload image/animation, and generate json, upload json. 
-->

<!--
  Example:
  {
    "name": "r/place BANANO 2022",
    "image": "QmVvAhBftbWg6pAR36Gg5DWzi2YBdGDXoHHBjsndzJV1i8",
    "animation_url": "QmTza4eYsyzBoZo1a3BEWVzfCgeXGH8np3Qt8VPcPQyxk4",
    "description": "Participation token for BANANO contributors on r/place in 2022.\n\n538 contributors were selected at random by checking pixels manually and from users who actively facilitated communication.\n\nThe artwork is an artistic interpretation of the first collaboration at (200, 910).",
    "properties": {
      "issuer": "ban_1rp1aceaawpub5zyztzs4tn7gcugm5bc3o6oga16bb18bquqm1bjnoomynze",
      "supply_block_hash": "079871683378A92059E87A4BABFABCCC066ED529D53D4474541836267CF19AAF"
    }
  }
-->

<div class="p-2">
  <p class="mb-2">Something not going quite right? Check out our hopefully helpful <a class="link" href="/help/minting">help page</a>. We recommend you run this locally for security reasons.</p>
  {#if mintSuccess}
    <div class="alert alert-success">
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span>Success: Set the address's (first index of the seed inputted) rep to {nftRep} during the send and the NFT will mint+send. Please DM Prussia your minting address to have it whitelisted (otherwise it will not be crawled and will not show up on this site).</span>
    </div>
  {/if}

  {#if mintFailure}
    <div class="alert alert-error">
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span>Process failed.</span>
    </div>
  {/if}

  <div class="[&>*]:mt-2">
    <label for="api-key">Pinata API Key: </label><input type="text" id="api-key" class="input input-bordered input-sm w-full max-w-xs" placeholder="API key..." bind:value={apiKey}/>
    <br>
    <label for="api-secret">Pinata API Secret: </label><input type="text" id="api-secret" class="input input-bordered input-sm w-full max-w-xs" placeholder="API secret..." bind:value={apiSecret}/>
    <br>
    <label for="name">Name: </label><input id="name" type="text" class="input input-bordered input-sm w-full max-w-xs" placeholder="Name..." bind:value={name}/>
    <br>
    <label for="description">Description: </label>
    <br>
    <textarea id="description" class="textarea textarea-bordered" placeholder="lorem ipsum..." bind:value={description}></textarea>
    <br>
    <label for="seed">Banano Seed: </label><input id="seed" type="text" class="input input-bordered input-sm w-full max-w-xs" placeholder="Seed..." bind:value={seed}/>
    <br>
    <!--Image upload-->
    <input type="file" accept="image/*" class="file-input file-input-sm" bind:this={fileInput}>
    <br>
    <label for="supply">Max Supply (0 for unlimited): </label><input type="number" id="supply" class="input input-bordered input-sm w-full max-w-xs" placeholder=0 bind:value={supply}/>
    <br>
    <label for="do-first-mint">Automatic First Mint (see notes): </label><input type="checkbox" id="do-first-mint" class="checkbox checkbox-primary" checked={firstMint}/>
    <br>
    <button id="mint-button" class="btn btn-primary" disabled>Mint</button>
  </div>
</div>
