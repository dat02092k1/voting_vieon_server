'use strict';

const express = require('express');

const router = express.Router();

// init routes
router.use('/v1/api', require('./users/index'))
router.use('/v1/api', require('./votes/index'))
router.use('/v1/api', require('./contestant/contestant'))
router.use('/v1/api', require('./access/index'))

module.exports = router;