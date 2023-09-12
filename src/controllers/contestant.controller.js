'use strict';

const { asyncHandler } = require("../middleware/auth");
const { CREATED, OK } = require("../core/success.response");
const ContestantService = require("../services/contestant.service");

class ContestantController {
    create = asyncHandler(async (req, res, next) => {
        CREATED(res, 'create success', await ContestantService.createVote(req.body))
    })

    getAll = asyncHandler(async (req, res, next) => {
        OK(res, 'get user success', await UserService.getAll())
    })

    getById = asyncHandler(async (req, res, next) => {
        OK(res, 'get user by id', await UserService.getUserById(req.params.id))
    })

    update = asyncHandler(async (req, res, next) => {
        OK(res, 'user updated', await UserService.update(req.params.id, req.body))
    })

    delete = asyncHandler(async (req, res, next) => {
        OK(res, 'user deleted', await UserService.delete(req.params.id))
    })
}

module.exports = new ContestantController();