var axios = require("axios");
var TokenListModel = require('./models/tokenList');

const checkTokenList = async () => {
  while (true) {
    try {
      const result = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false&locale=en");
      for (let i = 0; i < result.data.length; i++) {
        try {
          const res1 = await axios.get(`https://api.exchange.coinbase.com/products/${result.data[i].symbol}-usd/ticker`);
          let token = await TokenListModel.findOne({ id: result.data[i].id });
          if (!token) {
            token = new TokenListModel(result.data[i]);
          }
          token.current_price = res1.data.price;
          token.low_24h = result.data[i].low_24h;
          token.high_24h = result.data[i].high_24h;
          await token.save();
          // console.log(res1.data);
        } catch (e) {
          continue;
        }
      }
      // const data = await TokenListModel.find();
      // io.emit("tokens", JSON.stringify(data));
      await delay(600000);
    } catch (e) {
      console.log(e)
      
      await delay(600000);
    }
  }
}

const delay = ms => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

module.exports = checkTokenList;