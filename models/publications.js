const mongoose = require('mongoose');
const PubSchema = mongoose.Schema({
  texte: { type: String, required: true },
  //date: { type: Date, required: true },
  //userId: { type: String, required: true },
  // comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]

});

const Publication = mongoose.model('Publication', PubSchema)

exports.Publication = Publication

exports.PubSchema = PubSchema;
