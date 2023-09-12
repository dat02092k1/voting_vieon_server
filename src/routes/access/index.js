'use strict';

const express = require('express');
const { asyncHandler } = require('../../middleware/auth');
const { authentication } = require('../../middleware/auth');
const accessController = require('../../controllers/access.controller');

const router = express.Router();

// signUp
router.post('/user/signUp', (accessController.signUp));
// signin
router.post('/user/login', (accessController.login));

// authentication
router.use(authentication);
// logout
router.post('/user/logout', (accessController.logout));

module.exports = router;