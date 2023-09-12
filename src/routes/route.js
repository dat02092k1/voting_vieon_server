'use strict';

const express = require('express');

const router = express.Router();

// init routes
 router.use('/v1/api', require('./users'))
 router.use('/v1/api', require('./access'))

module.exports = router;