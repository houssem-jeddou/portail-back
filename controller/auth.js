const config = require('config');
const jwt = require('jsonwebtoken')
const express = require('express');
const router = express.Router();
const _ = require('lodash')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { User } = require('../models/user')
const Joi = require('joi'); //  Joi is a class

function validateAuth(req) {
    const schema = {
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(3).max(255).required(),
    }
    return Joi.validate(req, schema)
}

exports.Auth = async (req, res) => {

    //input validation using joi 
    const { error } = validateAuth(req.body);
    if (error)
        return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send("Invalid email or password")

    const validPwd = await bcrypt.compare(req.body.password, user.password)
    if (!validPwd)
        return res.status(400).send("Invalid email or password")

    const token = user.generateAuthToken();

    res.send(token)
}