const mongoose = require('mongoose')
const Joi = require('joi'); //  Joi is a class
const config = require('config');
const jwt = require('jsonwebtoken');
const { sectionSchema } = require('./section');

const userSchema = mongoose.Schema({
    username: { type: String, required: true, minlength: 3, maxlength: 30, trim: true },
    firstname: { type: String, required: true, minlength: 3, maxlength: 30, trim: true },
    lastname: { type: String, required: true, minlength: 3, maxlength: 30, trim: true },
    sectionBac: { type: String, required: true, minlength: 3, maxlength: 50, trim: true },
    scoreBac: { type: Number, required: true, },
    password: { type: String, required: true, minlength: 5, maxlength: 1024, trim: true },
    // email: { type: String, required: true, minlength: 5, maxlength: 255, trim: true, unique: true },
    // isAdmin: Boolean,
    // section: sectionSchema

});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        _id: this._id,
        // isAdmin: this.is
    }, config.get("jwtPrivateKey"))
    return token;
}

const User = mongoose.model('User', userSchema)


function validateuser(user) {
    const schema = {
        username: Joi.string().min(3).max(50).required(),
        firstname: Joi.string().min(3).max(50).required(),
        lastname: Joi.string().min(3).max(50).required(),
        sectionBac: Joi.string().min(3).max(50).required(),
        scoreBac: Joi.number().min(0).required(),
        password: Joi.string().min(5).max(255).required(),
        // email: Joi.string().min(3).max(255).required().email(),
        // sectionId: Joi.objectId().required(),
        // pubs: [{ type: Schema.Types.ObjectId, ref: 'Publication' }]
    }
    return Joi.validate(user, schema)
}

exports.userSchema = userSchema;
exports.User = User;
exports.validateuser = validateuser;
