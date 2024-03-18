<script>
  import { onMount } from 'svelte';

  //https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt#rsa-oaep
  //https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt#rsa-oaep

  const hex_chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

  function uint8_to_hex(uint8) {
    let hex = "";
    for (let i=0; i < uint8.length; i++) {
      hex += hex_chars[Math.floor(uint8[i]/16)];
      hex += hex_chars[uint8[i] % 16];
    }
    return hex;
  }

  function hex_to_uint8(hex) {
    hex = hex.toUpperCase();
    let uint8 = new Uint8Array(Math.floor(hex.length/2));
    for (let i=0; i < Math.floor(hex.length/2); i++) {
      uint8[i] = hex_chars.indexOf(hex[i*2])*16;
      uint8[i] += hex_chars.indexOf(hex[i*2+1]);
    }
    return uint8;
  }

  //convert from Ed25519 (blake2b) to x25519
  /*deleted user on the nano discord:
  @IPDetective I have great news for you. I was looking more closely into your idea of using nano keys for asymmetric encryption cause it interested me. Remember the libsodium functions to convert ed25519 keys to curve25519? I said that you might have to edit them because nano uses blake2b with ed25519 instead of sha512.

  But then I looked at the code for the functions. The one to convert public keys is super complicated, but it doesn't use the hash function. The one to convert private keys is much less complicated and does use the hash.

  It's trivially easy to write your own code to convert the private key, replacing sha512 with blake2b 
  It's trivially easy to write your own code to convert the private key, replacing sha512 with blake2b 
  Here it is in python

  ```
  import hashlib

  def sk_to_curve25519(sk):
      h = bytearray(hashlib.blake2b(sk, digest_size=64).digest())
      h[0] &= 248
      h[31] &= 127
      h[31] |= 64
      return bytes(h[:32]) # Return the upper 32 bytes of the 64 byte array
  ```
  
  I did some testing. Since only the function to convert the private key uses the hash, you don't need to worry about the complex public key function. You can use libsodium to convert the public key, and just write your own function to convert the private key, and it'll work for encryption/decryption 
  */
  //Thank you so much random deleted user on the nano discord!!
  function blake2bConvertSecretKey(secret_key) {
    const context = blakejs.blake2bInit(64);
    blakejs.blake2bUpdate(context, secret_key);
    const h = blakejs.blake2bFinal(context);
    h[0] &= 248
    h[31] &= 127
    h[31] |= 64
    return h.slice(0, 32);
  }

  let asymc_address, asymc_message, asymc_seed, asymc_encrypted, asymc_nonce, asymc_pk, asymc_pubk;
  let asymc_index = 0;
  let asymc_encrypt_output = "";
  let asymc_decrypt_output = "";
  let asymc_gen_output = "";

  //32 bytes
  function gen_random_box_key_pair() {
    let key_pair = nacl.box.keyPair();
    asymc_gen_output = `Public key: ${uint8_to_hex(key_pair.publicKey)}, Private key: ${uint8_to_hex(key_pair.secretKey)}`;
  }

  onMount(() => {
    document.getElementById("asymc-encrypt").onclick = async () => {
      let public_key = window.bananocoinBananojs.getAccountPublicKey(asymc_address.trim());
      let nonce = new Uint8Array(24);
      window.crypto.getRandomValues(nonce);
      public_key = ed2curve.convertPublicKey(hex_to_uint8(public_key));
      console.log(public_key)
      let encrypted = nacl.box((new TextEncoder()).encode(asymc_message), nonce, public_key, hex_to_uint8(asymc_pk.trim()));
      asymc_encrypt_output = `${uint8_to_hex(encrypted)}, nonce: ${uint8_to_hex(nonce)}`;
    };

    document.getElementById("asymc-decrypt").onclick = async () => {
      let private_key = window.bananocoinBananojs.getPrivateKey(asymc_seed.trim(), asymc_index);
      //private_key = ed2curve.convertSecretKey(hex_to_uint8(private_key));
      private_key = blake2bConvertSecretKey(hex_to_uint8(private_key));
      console.log(nacl.box.keyPair.fromSecretKey(private_key))
      //console.log(ed2curve.convertKeyPair({ publicKey: hex_to_uint8("D1BAB4851289F4B5972F4650D914B9A01D43C8A51B40EFB0AE16FB55FDEA8352"), secretKey: hex_to_uint8("8E1236E83B88446ECE38854EC9E9A15570F7298096CA718712D54FD8A74678C7") }))
      let decrypted = nacl.box.open(hex_to_uint8(asymc_encrypted.trim()), hex_to_uint8(asymc_nonce.trim()), hex_to_uint8(asymc_pubk.trim()), private_key);
      console.log(decrypted)
      if (decrypted === null) {
        asymc_decrypt_output = "DECRYPTION FAILED";
      } else {
        asymc_decrypt_output = (new TextDecoder()).decode(decrypted.buffer);
      }
    };
  });
</script>

<svelte:head>
  <title>Cryptography Tools</title>
  <script src="/modules/banano.js"></script>
  <script src="/modules/ed2curve.js"></script>
</svelte:head>

<div>
  <p>USE THIS SITE WHILE OFFLINE! Inputting seed, etc, on a web page is generally not a good idea. Disconnecting from the internet is a good bare minimum security precaution.</p>
  <hr/>
  <h2 class="text-xl">Generate Random Asymmetric Keypair</h2>
  <button id="asymc-gen" class="btn btn-primary" on:click={gen_random_box_key_pair}>Generate</button>
  <p>{asymc_gen_output}</p>
  <hr/>
  <div>
    <h2 class="text-xl">x25519-xsalsa20-poly1305 (tweetnacl) Asymmetrically Encrypt with own Private Key, and peer's address</h2>
    <label for="asymc-address">Address of recepient:</label><input id="asymc-address" type="text" class="input input-bordered input-sm w-full max-w-xs" bind:value={asymc_address}/>
    <br>
    <label for="asymc-pk">Own private key:</label><input id="asymc-pk" type="text" class="input input-bordered input-sm w-full max-w-xs" bind:value={asymc_pk}/>
    <br>
    <label for="asymc-message">Message:</label><input id="asymc-message" type="text" class="input input-bordered input-sm w-full max-w-xs" bind:value={asymc_message}/>
    <br>
    <button id="asymc-encrypt" class="btn btn-primary">Encrypt</button>
    <p>{asymc_encrypt_output}</p>
  </div>
  <hr/>
  <div>
    <h2 class="text-xl">x25519-xsalsa20-poly1305 (tweetnacl) Asymmetrically Decrypt with own seed, nonce, and peer's Public Key</h2>
    <label for="asymc-seed">Your seed:</label><input id="asymc-seed" type="text" class="input input-bordered input-sm w-full max-w-xs" bind:value={asymc_seed}/>
    <br>
    <label for="asymc-index">Your seed index:</label><input id="asymc-index" type="number"  min=0 class="input input-bordered input-sm w-full max-w-xs" bind:value={asymc_index}/>
    <br>
    <label for="asymc-nonce">Nonce:</label><input id="asymc-nonce" type="text" class="input input-bordered input-sm w-full max-w-xs" bind:value={asymc_nonce}/>
    <br>
    <label for="asymc-pubk">Peer's public key:</label><input id="asymc-pubk" type="text" class="input input-bordered input-sm w-full max-w-xs" bind:value={asymc_pubk}/>
    <br>
    <label for="asymc-encrypted">Encrypted:</label><input id="asymc-encrypted" type="text" class="input input-bordered input-sm w-full max-w-xs"bind:value={asymc_encrypted}/>
    <br>
    <button id="asymc-decrypt" class="btn btn-primary">Decrypt</button>
    <p>{asymc_decrypt_output}</p>
  </div>
</div>

<style>
  label {
    margin-right: 5px;
  }
  input {
    margin-bottom: 5px;
  }
  hr {
    margin-top: 15px;
    margin-bottom: 15px;
  }
</style>
