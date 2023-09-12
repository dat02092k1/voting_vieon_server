const express = require('express')
const router = express.Router()
const contestantController = require('../../controllers/contestant.controller')

router.post('/contestant/create', contestantController.create)


module.exports = router;
