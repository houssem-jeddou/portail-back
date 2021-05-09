//const asyncMiddleware = require('../middleware/async')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose')
const { validateFormation, Formation } = require('../models/formation')

exports.CreateFormation = async (req, res) => {
    //input validation using joi 
    const { error } = validateFormation(req.body);
    if (error)
        return res.status(400).send(error.details[0].message)

    const formation = new Formation({
        name: req.body.name,// we can read it thnx to the middleware
        description: req.body.description,

    })
    await formation.save();
    //convention: when we add a new object to the server we should return 
    //that obj into the body of the response since the client may need its id 
    res.send(formation);
}

exports.UpdateFormation = async (req, res) => {
    const { error } = validateFormation(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    const formation = await Formation.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
    }, { new: true })
    //look up the formation 
    if (!formation) return res.status(404).send('NOT FOUND ')//404

    //input validation using joi 

    res.send(formation);
}

exports.DeleteFormation = async (req, res) => {
    const formation = await Formation.findByIdAndRemove(req.params.id)
    if (!formation) return res.status(404).send('NOT FOUND ')//404

    res.send(formation)
}

exports.GetoneFormation = async (req, res) => {
    const formation = await Formation.findById(req.params.id)
    if (!formation) return res.status(404).send('NOT FOUND ')//404
    res.send(formation);
}

exports.GetallFormation = async (req, res) => {
    const formations = await Formation.find().sort('name')
    res.send(formations)
}