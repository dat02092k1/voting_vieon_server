'use strict';

const { asyncHandler } = require("../middleware/auth");
const { CREATED, OK } = require("../core/success.response");
const UserService = require("../services/user.service");

class UserController {
    create = asyncHandler(async (req, res, next) => {
        CREATED(res, 'create success', await UserService.create(req.body))
    })



    getAll = asyncHandler(async (req, res, next) => {
        OK(res, 'get user success', await AccessService.logout(req.keyStore))
    })
}

module.exports = new UserController();