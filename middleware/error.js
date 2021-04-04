const winston = require('winston');//default logger

module.exports = function (err, req, res, next) {
    // winston.log(logging level ,err.message ); 
    winston.error(err.message, err);
    res.status(500).send('Something failed')
}

//log in levels : err, warn , inf, verbose, debug , silly 