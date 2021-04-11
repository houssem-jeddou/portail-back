//const asyncMiddleware = require('../middleware/async')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose')
const { validateComment, Comment } = require('../models/comment');
const { User } = require('../models/user');
const { Publication } = require('../models/publications');

exports.CreateComment = async (req, res) => {
    //input validation using joi 
    const { error } = validateComment(req.body);
    if (error)
        return res.status(400).send(error.details[0].message)

    // const user = await User.findById(req.body.userId)
    // if (!user) return res.status(400).send('Invalid user')

    // const publication = await Publication.findById(req.body.pubId)
    // if (!publication) return res.status(400).send('Invalid publication')

    const comment = new Comment({
        content: req.body.content,
        date: new Date(),
        // user: {
        //     name: user.name,
        //     _id: user._id,
        // },
        // publication: {
        //     texte: publication.texte,
        //     _id: publication._id
        // }
    })
    await comment.save();
    res.send(comment);
}

exports.UpdateComment = (req, res, next) => async (req, res) => {
    const { error } = validateComment(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    const user = await User.findById(req.body.userId);
    if (!user) return res.status(400).send('Invalid user.');

    const publication = await Publication.findById(req.body.publicationId);
    if (!publication) return res.status(400).send('Invalid publication.');


    const comment = await Comment.findByIdAndUpdate(req.params.id, {
        content: req.body.content,
        date: new Date(),
        // user: {
        //     name: user.name,
        //     _id: user._id
        // },
        // publication: {
        //     texte: publication.texte,
        //     _id: publication._id
        // }
        //nested doc
        //user: { name: String, age: Number }
    },
        { new: true })
    //look up the Comment 
    if (!comment) return res.status(404).send('NOT FOUND ')//404

    res.send(comment);
}

exports.DeleteComment = async (req, res) => {
    const comment = await Comment.findByIdAndRemove(req.params.id)
    if (!comment) return res.status(404).send('NOT FOUND ')//404

    res.send(comment)
}

exports.GetoneComment = async (req, res) => {
    const comment = Comment.findById(req.params.id)
    if (!comment) return res.status(404).send('NOT FOUND ')//404
    res.send(comment);
}

exports.GetallComment = async (req, res) => {
    const comments = await Comment.find().sort('date')
    res.send(comments)
}