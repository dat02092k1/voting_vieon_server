const express = require('express')
const router = express.Router()
const contestantController = require('../../controllers/contestant.controller')

router.post('/contestant', contestantController.create)
router.get('/contestant', contestantController.getAll)
router.get('/contestant/:id', contestantController.getById)
router.delete('/contestant', contestantController.delete)
router.put('/contestant', contestantController.update)


module.exports = router;
