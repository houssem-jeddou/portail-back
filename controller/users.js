const express = require('express');
const router = express.Router();
const _ = require('lodash')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { validateuser, User } = require('../models/user')
const config = require('config');
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')


exports.Me = async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')
    res.send(user)
}

exports.CreateUser = async (req, res) => {

    //input validation using joi 
    const { error } = validateuser(req.body);
    if (error)
        return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ username: req.body.username })
    if (user) return res.status(400).send("User already registered")

    user = new User(_.pick(req.body, ['username', 'firstname', 'lastname', 'sectionBac', 'scoreBac', 'password']))
    //salt is a random string added to the pwd before hashing it for more security
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    await user.save();
    const token = user.generateAuthToken();
    //returning the token as a header
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'username', 'firstname', 'lastname', 'sectionBac', 'scoreBac']))
}