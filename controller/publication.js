const express = require('express');
const mongoose = require('mongoose')
const url = require('url');
var fs = require('fs');
const { validatePub, Publication } = require('../models/publications');
const  { Preference }  = require('../models/preference');
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
    author.publications.push(publication);
    author.save();
    publication.save();
    res.send(publication);
}}

exports.UpdatePublication = (req, res, next) => async (req, res) => {
    const { error } = validatePub(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    const publication = await Publication.findByIdAndUpdate(req.params.id, {
        texte: req.body.texte,
        date: new Date(),
    }, { new: true })
    //look up the publication 
    if (!publication) return res.status(404).send('NOT FOUND ')//404

    res.send(publication);
}

exports.DeletePublication = async (req, res) => {
    const publication = await Publication
        .findByIdAndRemove(req.params.id)
        .populate("author -[password , publications]")
        .populate("comments")
    if (!publication) return res.status(404).send('NOT FOUND ')//404

    res.send(publication)
}

exports.GetonePublication = async (req, res) => {
    const publication = Publication
        .findById(req.params.id)
        .populate("comments")
        .populate("author")
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
        .populate("comments")
        .populate("author")
        var r =[];
       const filteredPub = publications.filter(pub => {
           let isValid = false;
               for (key in fil) {
                  if(pub.texte.toLowerCase().indexOf(fil[key][0].toLowerCase())!=-1){
                    var s=pub.toObject();
                    s.order =fil[key][1];
                    r.push(s);
                  }
                //console.log(isValid || pub.texte.indexOf(fil[key][0])!=-1)
                //console.log(isValid && pub.texte.search(filters[key])!=-1)
                 isValid = isValid || pub.texte.toLowerCase().indexOf(fil[key][0].toLowerCase())!=-1;
               }

               return isValid;
             })
             r.sort((a,b) => (a.order > b.order) ? -1 : ((b.order > a.order) ? 1 : 0))
            //res.send(filteredPub)
    res.send(r)
}else{
    const publications = await Publication
    .find()
    .populate("comments")
    .populate("author")
    .sort({ date: -1 })
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

 exports.GetDiplomaPub = async (req, res) => {
    
    const publications = await Publication
        .find()
        .populate("comments")
        .populate("author")
        .sort({ date: -1 })
        const filteredPub = publications.filter(pub => pub.type=="Diploma");
    res.send(filteredPub)
}

exports.SearchPublication= async(req, res, next) => {
    const publications = await Publication
        .find()
        const searchedPub = publications.filter(pub => {
            let isValid = true;
            isValid = isValid && pub.texte==req.params.query
             return isValid;
              });
        //.find({texte:  { $regex: req.params.query } })
        res.send(searchedPub)
    }

