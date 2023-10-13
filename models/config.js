var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var configSchema = new Schema({
  sellPercent: Number
}, {
  timestamps: true
});

module.exports = mongoose.model('config', configSchema);
