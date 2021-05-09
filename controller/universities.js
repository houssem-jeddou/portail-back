//const asyncMiddleware = require('../middleware/async')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const { validateUniversity, University } = require('../models/university');
const { Formation } = require('../models/formation');


exports.CreateUni = async (req, res) => {
    const { error } = validateUniversity(req.body);
    if (error)
        return res.status(400).send(error.details[0].message)

    const c = [];
    for (let i = 0; i < req.body.uniChoix.length; i++) {
        const e = req.body.uniChoix[i];
        const formation = await Formation.findById(e.uniFormation)
            .then((result) => {
                if (!result) {
                    return res.status(400).send('Invalid formation.');
                }
                console.log("result  : ", result._id);
                c.push({
                    uniFormation: result._id,
                    uniScore: e.uniScore
                })
                return c;
            })
            .catch((err) => {
                console.log(err)
            })
    }

    console.log("finally uniChoix = ", c)
    const university = new University({
        name: req.body.name,
        localisation: req.body.localisation,
        description: req.body.description,
        uniChoix: c,
    })
    await university.save();
    res.send(university);
}

exports.UpdateUni = async (req, res) => {
    const { error } = validateUniversity(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    const c = [];
    for (let i = 0; i < req.body.uniChoix.length; i++) {
        const e = req.body.uniChoix[i];
        const formation = await Formation.findById(e.uniFormation)
            .then((result) => {
                if (!result) {
                    return res.status(400).send('Invalid formation.');
                }
                console.log("result  : ", result._id);
                c.push({
                    uniFormation: result._id,
                    uniScore: e.uniScore
                })
                return c;
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const university = new University({
        name: req.body.name,
        localisation: req.body.localisation,
        description: req.body.description,
        uniChoix: c,
    })

    //look up the university 
    if (!university) return res.status(404).send('NOT FOUND ')//404

    res.send(university);
}

exports.DeleteUni = async (req, res) => {
    const university = await University.findByIdAndRemove(req.params.id)
    if (!university) return res.status(404).send('NOT FOUND ')//404

    res.send(university)
}

exports.GetoneUni = async (req, res) => {
    const university = await University.findById(req.params.id)
    if (!university) return res.status(404).send('NOT FOUND ')//404
    res.send(university);
}

exports.GetallUni = async (req, res) => {
    const universities = await University
        .find()
        .sort('name')
    //.populate("publication")
    res.send(universities)
}