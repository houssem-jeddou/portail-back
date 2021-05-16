const express = require('express');
const mongoose = require('mongoose')
const url = require('url');
var fs = require('fs');
const { validatePub, Publication } = require('../models/publications');
const { User } = require('../models/user');
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
  };


exports.CreatePublication = async (req, res) => {
    //input validation using joi 
    const { error } = validatePub(req.body);
    if (error)
        return res.status(400).send(error.details[0].message)
        
    const author = await User.findById(req.body.author);
    if (!author) return res.status(400).send('Invalid author.');
    if(req.files!=null){
        var img =req.files.photo;
        var name = img.name.split(' ').join('_');
        name = name.replace(".","_");
        const extension = MIME_TYPES[img.mimetype];
        filename= name + Date.now() + '.' + extension;
        img.mv('images/'+filename,function(err){
          if(err) {
            res.json({ err})
          }else{
          const publication = new Publication({
            texte : req.body.texte,
            date :req.body.date,
            author: author._id,
            photo:filename,
            type:res.tag
          });
          author.publications.push(publication);
          author.save();
          publication.save();
         // await author.save();
          //await publication.save();
          res.send(publication);
          }
        })
      }else{
    const publication = new Publication({
        texte: req.body.texte,
        date: req.body.date,
        author: author._id,
        type:res.tag

    })

    await publication.save();
    author.publications.push(publication);
    author.save();
    publication.save();
    res.send(publication);
}}

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
    if(req.cookies.search){
    const filters = JSON.parse(req.cookies.search); 
    var fil=[];
    for (key in filters) {
         fil.push(JSON.parse(filters[key])) 
    }
    const publications = await Publication
        .find()
        .select('-__v')
        .populate('author', '-password -scoreBac -sectionBac -publications -__v ')
        .populate('comments', '-__v -publication -author')
        .sort('date')
    res.send(publications)
}
}

exports.GetRentingPub = async (req, res) => {
     const publications = await Publication
         .find()
         .populate("comments")
         .populate("author")
         .sort({ date: -1 })
         const filteredPub = publications.filter(pub => pub.type=="Renting");
     res.send(filteredPub)
 }

