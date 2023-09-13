const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');

// init middleware
app.use(compression())
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// config cors
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.configure(function() {
    app.use(allowCrossDomain);
    //some other code
});

// init db
require('./database/init.mongodb');

// init routes
app.get('/', (req, res, next) => {
    const strCompress = 'Heh fapcist';

    return res.status(200).json(
        { message: 'heh node',
            metadata: strCompress }
    );
})

app.use('/', require('./routes/route'))

// handle errors
const {logErrorMiddleware, returnError, is404Handler, isOperationalError} = require("./middleware/errorHandler");
app.use(is404Handler)
app.use(logErrorMiddleware)
app.use(returnError)

// init cron job
const task = require('./task/reset_vote');
task.resetVote();
module.exports = app