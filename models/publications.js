const mongoose = require('mongoose');
const Joi = require('joi');

const PubSchema = mongoose.Schema({
  texte: { type: String, required: true, minlength: 3, maxlength: 255, trim: true },
  date: { type: Date, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]

});

const Publication = mongoose.model('Publication', PubSchema)

function validatePub(pub) {
  const schema = {
    texte: Joi.string().min(3).required(),
    author: Joi.string().min(3).required(),
  }
  return Joi.validate(pub, schema)
}

exports.Publication = Publication
exports.validatePub = validatePub
exports.PubSchema = PubSchema;
