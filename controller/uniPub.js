const express = require('express');
const mongoose = require('mongoose')
const { validatePub, Publication } = require('../models/publications');
const { University } = require('../models/university');

//les publications qui concernent une université.
//takes the id of the uni 

exports.GetPubsForUni = async (req, res) => {
    //list of the pubs related to that uni 
    const pubsForUni = []

    // find uni 
    const university = await University
        .findById(req.params.id)
        .select('-__v')
        .populate('uniChoix.uniFormation', ' -__v ')
    if (!university) return res.status(404).send('NOT FOUND ')//404

    //the uni must have an array of keywords:

    //fetch all pubs 
    const publications = await Publication
        .find()
        .select('-__v')
        .populate('author', '-password -scoreBac -sectionBac -publications -__v ')
        .populate('comments', '-__v -publication -author')
        .sort('date')

    // map through every pub to see which ones are retaed to the uni 
    for (let i = 0; i < publications.length; i++) {
        const p = publications[i]
        var t = p.texte.replace(/[^\w\s]/gi, ' ')
        var txt = t.replace(/\s\s+/g, ' ');
        var n = -1
        var j = 0


        do {
            console.log('j =  ', j)
            console.log('university.keywords[j]   :  ', university.keywords[j])
            console.log('txt  =  ', txt)
            n = p.texte.toLowerCase().search(university.keywords[j].toLowerCase());
            console.log('n  : ', n)
            j++;
        }
        while (n === -1 && j < university.keywords.length);

        // n=-1 si n'existe pas.
        if (n !== -1) { pubsForUni.push(p) }

        /*      //extract list of words: //var words =[]
                words = p.texte.match(/\b(\w+)\b/g)
        
                //if one item from uni.keywords is found in words we add p to pubsForUni 
                const found = words.some(r => university.keywords.indexOf(r) >= 0)
         */
        console.log("pubsForUni  :  ", pubsForUni);
    }
    res.send(pubsForUni)
}