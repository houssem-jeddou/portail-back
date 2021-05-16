const mongoose = require('mongoose')
const Joi = require('joi'); //  Joi is a class
const { userSchema } = require('./user');


const preferenceSchema = mongoose.Schema({
    content: { type: Array, required: true, minlength: 1, maxlength: 10, trim: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

})

const Preference = mongoose.model('Preference', preferenceSchema)


function validatepreference(preference) {
    const schema = {
        content: Joi.string().min(3).required(),
        user: Joi.string().min(3).required(),
    } 
    return Joi.validate(preference, schema)

}

exports.Preference = Preference;
exports.validatepreference = validatepreference;
exports.preferenceSchema = preferenceSchema;
