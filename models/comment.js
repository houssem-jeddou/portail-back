const mongoose = require('mongoose')
const Joi = require('joi'); //  Joi is a class
const { userSchema } = require('./user');
const { PubSchema } = require('./publications');


const commentSchema = mongoose.Schema({
    content: { type: String, required: true, minlength: 3, maxlength: 255, trim: true },
    date: { type: Date, required: true },
    ///pub: { type: mongoose.Schema.Types.ObjectId, ref: 'Publication' },

    //user: userSchema,
    //publication: PubSchema,
})

const Comment = mongoose.model('Comment', commentSchema)


function validateComment(comment) {
    const schema = {
        content: Joi.string().min(3).required(),
        // pubId: Joi.objectId().required(),
        // userId: Joi.objectId().required(),
    }
    //link the comment to the connected user
    //link the comment to the publication from the frontend input field 
    return Joi.validate(comment, schema)

}

exports.Comment = Comment;
exports.validateComment = validateComment;
exports.commentSchema = commentSchema;
