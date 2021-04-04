const mongoose = require('mongoose')
const Joi = require('joi'); //  Joi is a class
const config = require('config');
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: { type: String, required: true, minlength: 5, maxlength: 50, trim: true },
    email: { type: String, required: true, minlength: 5, maxlength: 255, trim: true, unique: true },
    password: { type: String, required: true, minlength: 5, maxlength: 1024, trim: true },
    isAdmin: Boolean
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
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(3).max(255).required(),
    }

    return Joi.validate(user, schema)

}

exports.User = User;
exports.validateuser = validateuser;
