const mongoose = require('mongoose')
const Joi = require('joi'); //  Joi is a class
const { formationSchema } = require('./formation');


const universitySchema = mongoose.Schema({
    name: { type: String, required: true, minlength: 5, maxlength: 255, trim: true },
    localisation: { type: String, required: true, minlength: 5, maxlength: 255, trim: true },
    description: { type: String, required: true, minlength: 5, maxlength: 255, trim: true },
    uniChoix: [{
        uniFormation: { type: mongoose.Schema.Types.ObjectId, ref: 'Formation', required: true },
        uniScore: { type: Number, required: true, }
    }]

})

const University = mongoose.model('University', universitySchema)


function validateUniversity(university) {
    const schema = {
        name: Joi.string().min(3).required(),
        localisation: Joi.string().min(3).required(),
        description: Joi.string().min(3).required(),
        uniChoix: Joi.array()
            .items({
                uniFormation: Joi.string().min(3).required(),
                uniScore: Joi.number().min(0).required(),
            }),
    }
    return Joi.validate(university, schema)
}

exports.University = University;
exports.validateUniversity = validateUniversity;
exports.universitySchema = universitySchema;
