'use strict';

const express = require('express');
const { authentication } = require('../../middleware/auth');
const { verifyToken } = require('../../middleware/verify');
const accessController = require('../../controllers/access.controller');

const router = express.Router();

// signUp
router.post('/user/signUp', (accessController.signUp));
// signin
router.post('/user/login', (accessController.login));

// authentication
router.use(authentication);
// logout
router.post('/user/logout', verifyToken, (accessController.logout));

module.exports = router;