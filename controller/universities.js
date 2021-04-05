//const asyncMiddleware = require('../middleware/async')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose')
const { validateUniversity, University } = require('../models/university')

exports.CreateUni = async (req, res) => {
    //input validation using joi 
    const { error } = validateUniversity(req.body);
    if (error)
        return res.status(400).send(error.details[0].message)

    const university = new University({
        name: req.body.name // we can read it thnx to the middleware
    })
    await university.save();
    //convention: when we add a new object to the server we should return 
    //that obj into the body of the response since the client may need its id 
    res.send(university);
}

exports.UpdateUni = (req, res, next) => async (req, res) => {
    const { error } = validateUniversity(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    const university = await University.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
    //look up the university 
    if (!university) return res.status(404).send('NOT FOUND ')//404

    //input validation using joi 

    res.send(university);
}

exports.DeleteUni = async (req, res) => {
    const university = await University.findByIdAndRemove(req.params.id)
    if (!university) return res.status(404).send('NOT FOUND ')//404

    res.send(university)
}

exports.GetoneUni = async (req, res) => {
    const university = University.findById(req.params.id)
    if (!university) return res.status(404).send('NOT FOUND ')//404
    res.send(university);
}

exports.GetallUni = async (req, res) => {
    //throw new Error('testin new erro cant find universities')
    const universities = await University.find().sort('name')
    res.send(universities)
}