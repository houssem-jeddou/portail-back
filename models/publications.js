const mongoose = require('mongoose');
const PubSchema = mongoose.Schema({
  texte: { type: String, required: true },
  date: {type: Date ,required: true},
  userId: { type: String, required: true },
});

module.exports = mongoose.model('Publication', PubSchema);