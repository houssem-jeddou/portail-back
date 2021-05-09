const mongoose = require('mongoose')
const Joi = require('joi');


const formationSchema = mongoose.Schema({
    name: { type: String, required: true, minlength: 5, maxlength: 255, trim: true },
    description: { type: String, required: true, minlength: 5, maxlength: 255, trim: true },

})

const Formation = mongoose.model('Formation', formationSchema)


function validateFormation(formation) {
    const schema = {
        name: Joi.string().min(3).required(),
        description: Joi.string().min(3).required(),

    }

    return Joi.validate(formation, schema)

}

exports.Formation = Formation;
exports.validateFormation = validateFormation;
exports.formationSchema = formationSchema;
