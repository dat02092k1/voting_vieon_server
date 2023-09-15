const express = require('express')
const router = express.Router()
const voteController = require('../../controllers/voting.controller')
const verifyMiddileware = require("../../middleware/verify");

// router.use(verifyMiddileware.authentication);

router.post('/vote', verifyMiddileware.authentication, voteController.vote)

module.exports = router;
