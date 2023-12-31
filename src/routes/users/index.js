const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user.controller')

router.post('/user', userController.create)
router.get('/user', userController.getAll)
router.get('/user/:id', userController.getById)
router.put('/user/:id', userController.update)
router.delete('/user/:id', userController.delete)

module.exports = router;
