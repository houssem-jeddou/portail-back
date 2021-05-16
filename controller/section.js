//const asyncMiddleware = require('../middleware/async')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose')
const { validateSection, Section } = require('../models/section')

exports.CreateSection = async (req, res) => {
    //input validation using joi 
    const { error } = validateSection(req.body);
    if (error)
        return res.status(400).send(error.details[0].message)

    const section = new Section({
        name: req.body.name
    })
    await section.save();
    res.send(section);
}

exports.UpdateSection = async (req, res) => {
    const { error } = validateSection(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    const section = await Section.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
    //look up the section 
    if (!section) return res.status(404).send('NOT FOUND ')//404

    res.send(section);
}

exports.DeleteSection = async (req, res) => {
    const section = await Section.findByIdAndRemove(req.params.id)
    if (!section) return res.status(404).send('NOT FOUND ')//404

    res.send(section)
}

exports.GetoneSection = async (req, res) => {
    const section = await Section.findById(req.params.id)
    if (!section) return res.status(404).send('NOT FOUND ')//404
    res.send(section);
}

exports.GetallSection = async (req, res) => {
    const sections = await Section.find().sort('name')
    res.send(sections)
}