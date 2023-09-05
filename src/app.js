const express = require('express');
const app = express();

// init db

// init routes
app.get('/', (req, res, next) => {
    const strCompress = 'Heh fapcist';

    return res.status(200).json(
        { message: 'heh node',
            metadata: strCompress.repeat(10000) }
    );
})
// handle errors

module.exports = app