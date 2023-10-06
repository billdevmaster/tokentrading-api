var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tokenListSchema = new Schema({
  id: String,
  symbol: String,
  name: String,
  name: String,
  image: String,
  current_price: Number,
  market_cap: Number,
  market_cap_rank: Number,
  total_volume: Number,
  high_24h: Number,
  low_24h: Number,
  price_change_24h: Number,
  price_change_percentage_24h: Number,
  market_cap_change_24h: Number,
  market_cap_change_percentage_24h: Number,
  circulating_supply: Number,
  total_supply: Number,
  max_supply: Number,
  ath: Number,
  ath_date: Date,
  atl: Number,
  atl_date: Date,
  status: String,
  buy_price: Number,
  sell_price: Number
}, {
  timestamps: true
});

module.exports = mongoose.model('TokenList', tokenListSchema);
