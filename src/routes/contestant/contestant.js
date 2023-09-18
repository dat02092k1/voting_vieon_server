const express = require('express')
const router = express.Router()
const contestantController = require('../../controllers/contestant.controller')
const verifyMiddleware = require('../../middleware/verify')

router.post('/contestant', verifyMiddleware.isAdmin, contestantController.create)
router.get('/contestant', contestantController.getAll)
router.get('/contestant/:id', contestantController.getById)
router.delete('/contestant', verifyMiddleware.isAdmin, contestantController.delete)
router.put('/contestant', verifyMiddleware.isAdmin, contestantController.update)


module.exports = router;
