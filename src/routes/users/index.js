const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user.controller')

router.post('/user/create', userController.create)

module.exports = router;
