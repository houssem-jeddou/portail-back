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

    const author = await User.findById(req.body.author);
    if (!author) return res.status(400).send('Invalid author.');

    const publication = await Publication.findById(req.body.publication)
    if (!publication) return res.status(400).send('Invalid publication')

    const comment = new Comment({
        content: req.body.content,
        date: new Date(),
        author: author._id,
        publication: publication._id,
    })

    publication.comments.push(comment);
    await publication.save();
    await comment.save();
    res.send(comment);
}

exports.UpdateComment = async (req, res) => {
    const { error } = validateComment(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    const user = await User.findById(req.body.userId);
    if (!user) return res.status(400).send('Invalid user.');

    const publication = await Publication.findById(req.body.publicationId);
    if (!publication) return res.status(400).send('Invalid publication.');


    const comment = await Comment.findByIdAndUpdate(req.params.id, {
        content: req.body.content,
        date: new Date(),
        author: author._id,
        publication: publication._id,
    },
        { new: true })
    //look up the Comment 
    if (!comment) return res.status(404).send('NOT FOUND ')//404

    res.send(comment);
}

exports.DeleteComment = async (req, res) => {
    const comment = await Comment
        .findByIdAndRemove(req.params.id)
        .select('-__v')
        .populate('author', '-password -scoreBac -sectionBac -publications -__v ')
        .populate('publication', '-__v ')


    if (!comment) return res.status(404).send('NOT FOUND ')//404

    res.send(comment)
}

exports.GetoneComment = async (req, res) => {
    const comment = await Comment
        .findById(req.params.id)
        .select('-__v')
        .populate('author', '-password -scoreBac -sectionBac -publications -__v ')
        .populate('publication', '-__v -date -author -comments')

    if (!comment) return res.status(404).send('NOT FOUND ')//404
    res.send(comment);
}

exports.GetallComment = async (req, res) => {
    const comments = await Comment
        .find()
        .select('-__v')
        .populate('author', '-password -scoreBac -sectionBac -publications -__v ')
        .populate('publication', '-__v ')
        .sort('date')
    res.send(comments)
}