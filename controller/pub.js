const express = require('express');
const mongoose = require('mongoose')
const { validatePub, Publication } = require('../models/publications');
const { User } = require('../models/user');

exports.CreatePublication = async (req, res) => {
    //input validation using joi 
    const { error } = validatePub(req.body);
    if (error)
        return res.status(400).send(error.details[0].message)

    const author = await User.findById(req.body.author);
    if (!author) return res.status(400).send('Invalid author.');

    const publication = new Publication({
        texte: req.body.texte,
        date: new Date(),
        author: author._id,

    })

    await publication.save();
    author.publications.push(publication);
    await author.save();
    res.send(publication);
}

exports.UpdatePublication = async (req, res) => {
    const { error } = validatePub(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    const author = await User.findById(req.body.author);
    if (!author) return res.status(400).send('Invalid author.');

    const publication = await Publication.findByIdAndUpdate(req.params.id, {
        texte: req.body.texte,
        date: new Date(),
        author: author._id, //can't change author
        //comments
    }, { new: true })
    //look up the publication 
    if (!publication) return res.status(404).send('NOT FOUND ')//404

    res.send(publication);
}

exports.DeletePublication = async (req, res) => {
    const publication = await Publication
        .findByIdAndRemove(req.params.id)
        .select('-__v')
        .populate('author', '-password -scoreBac -sectionBac -publications -__v ')
        .populate('comments', '-__v ')

    if (!publication) return res.status(404).send('NOT FOUND ')//404

    res.send(publication)
}

exports.GetonePublication = async (req, res) => {
    const publication = await Publication
        .findById(req.params.id)
        .select('-__v')
        .populate('author', '-password -scoreBac -sectionBac -publications -__v ')
        .populate('comments', '-__v ')
        .populate({
            path: 'comments',
            populate: {
                path: 'author'
            }
        })

    if (!publication) return res.status(404).send('NOT FOUND ')//404
    res.send(publication);
}

exports.GetAllPublication = async (req, res) => {
    const publications = await Publication
        .find()
        .select('-__v')
        .populate('author', '-password -scoreBac -sectionBac -publications -__v ')
        .populate('comments', '-__v -publication -author')
        .sort('date')
    res.send(publications)
}