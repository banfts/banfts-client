export function validateHexHash(hash) {
  // Check if the hash contains only hexadecimal and has a length of 64 characters
  const hexRegex = /^([A-Fa-f0-9]{64})$/;
  return hexRegex.test(hash);
}

export function validateBananoAddress(address) {
  if (address.length !== 64) return false;
  if (!address.startsWith('ban_1') && !address.startsWith('ban_3'))  return false;
  if (!/^[13456789abcdefghijkmnopqrstuwxyz]+$/.test(address.substring(4, 64))) return false;
  return true;
}
