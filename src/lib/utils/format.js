// Credit: myself
export function format_commas(amount) {
  if (isNaN(Number(amount))) {
    return amount;
  }
  let negative = amount < 0;
  amount = Math.abs(amount);
  let before_dec = String(amount).split('.')[0];
  let amount_mod = before_dec;
  //iterate the amount of commas there are
  for (let i=0; i < Math.floor((before_dec.length-1)/3); i++) {
    let position = amount_mod.length-3*(i+1)-i;
    amount_mod = amount_mod.substring(0, position)+","+amount_mod.substring(position, amount_mod.length);
  }
  if (String(amount).split('.')[1]) {
    amount_mod = amount_mod+"."+String(amount).split('.')[1];
  }
  if (negative) {
    amount_mod = `-${amount_mod}`;
  }
  return amount_mod;
}
