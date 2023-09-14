const express = require('express')
const router = express.Router()
const contestantController = require('../../controllers/contestant.controller')
const verifyMiddleware = require('../../middleware/verify')

router.post('/contestant', verifyMiddleware.verifyToken, contestantController.create)
router.get('/contestant', contestantController.getAll)
router.get('/contestant/:id', contestantController.getById)
router.delete('/contestant', contestantController.delete)
router.put('/contestant', contestantController.update)


module.exports = router;
