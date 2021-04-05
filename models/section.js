const mongoose = require('mongoose')
const Joi = require('joi'); //  Joi is a class


const sectionSchema = mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 255, trim: true },
})

const Section = mongoose.model('Section', sectionSchema)


function validateSection(section) {
    const schema = {
        name: Joi.string().min(3).required(),
    }

    return Joi.validate(section, schema)

}

exports.Section = Section;
exports.validateSection = validateSection;
exports.sectionSchema = sectionSchema;
