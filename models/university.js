const mongoose = require('mongoose')
const Joi = require('joi'); //  Joi is a class


const universitySchema = mongoose.Schema({
    name: { type: String, required: true, minlength: 5, maxlength: 255, trim: true },
})

const University = mongoose.model('University', universitySchema)


function validateUniversity(university) {
    console.log('t')
    const schema = {
        name: Joi.string().min(3).required(),
        // localisation: Joi.string().min(3).required(),

    }

    return Joi.validate(university, schema)

}

exports.University = University;
exports.validateUniversity = validateUniversity;
exports.universitySchema = universitySchema;
