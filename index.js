require('express-async-errors')
const error = require('./middleware/error')
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const winston = require('winston');//default logger
require('winston-mongodb');
const Joi = require('joi'); //  Joi is a class
Joi.objectId = require('joi-objectid')(Joi);  //  Joi is a class
const express = require('express'); //express is a function
const users = require('./routes/users');
const auth = require('./routes/auth');
const publication = require('./routes/publication');
const universities = require('./routes/universities');
const section = require('./routes/section');
const comment = require('./routes/comments');


//caughting unhandleded exceptions for synch code:
process.on("uncaughtException", (ex) => {
    console.log("WE GOT AN uncaughtException ")
    winston.error(ex.message, ex)
    process.exit(1)
})

//caughting unhandleded promise rejection for synch code:
process.on("unhandledRejection", (ex) => {
    console.log("WE GOT AN unhandleded promise rejection ")
    winston.error(ex.message, ex)
    process.exit(1)
})

////winston and error.js only catches express errors /request processing pipeline
winston.add(winston.transports.File, { filename: 'logfile.log' })
//creates a new file "logfile" to save the logs in it 

//testing
//error thrown outside the context of processsing a request , Express
//throw new Error('Something failed during startup ')

// promise rejection thrown outside the context of Express
//testing
// const p = Promise.reject(new Error('Something failed with PROMISES'))
// p.then(() => console.log('promise Done'))


if (!config.get("jwtPrivateKey")) {
    console.log('FATAL ERROR : jwtPrivateKey is not defined ')
    process.exit(1) //0 success
}

const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://portail:portail@cluster0.xdstu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


const app = express();
app.use(express.json());
app.use(helmet());//to log requests 

app.use('/api/users', users)
app.use('/api/auth', auth)
app.use('/api/publication', publication)
app.use('/api/uni', universities)
app.use('/api/section', section)
app.use('/api/comment', comment)

app.use(error)

app.use(morgan('tiny'));//to log requests 


//We're adding a middleware
app.use(express.json())
//to parse json objects from tha body of the request 
//By default this feature is not enabled by express

const port = process.env.PORT || 3000;
// to change PORT:  set PORT=5000 in cmd
app.listen(port, () => {
    console.log(port);
});