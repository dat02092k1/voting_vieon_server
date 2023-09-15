'use strict';

const express = require('express');
const verifyMiddileware = require('../../middleware/verify');
const { verifyToken } = require('../../middleware/verify');
const accessController = require('../../controllers/access.controller');

const router = express.Router();

// signUp
router.post('/user/signUp', (accessController.signUp));
// signin
router.post('/user/login', (accessController.login));

// authentication
router.use(verifyMiddileware.authentication);
// logout
router.post('/user/logout', verifyMiddileware.verifyToken, (accessController.logout));

module.exports = router;