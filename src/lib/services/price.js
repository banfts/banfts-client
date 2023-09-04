// todo: maybe sure stores or something? 

export let usdPerBanano = 0;

export async function get_price() {
  usdPerBanano = (await (await fetch("https://api.coingecko.com/api/v3/coins/banano")).json()).market_data.current_price.usd;
}

get_price();

