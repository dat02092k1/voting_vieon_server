const express = require('express')
const router = express.Router()
const voteController = require('../../controllers/voting.controller')

router.post('/vote', voteController.create)


module.exports = router;
