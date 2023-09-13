'use strict';

const { asyncHandler } = require("../middleware/auth");
const { CREATED, OK } = require("../core/success.response");
const ContestantService = require("../services/contestant.service");

class ContestantController {
    create = asyncHandler(async (req, res, next) => {
        CREATED(res, 'create success', await ContestantService.createVote(req.body))
    })

    getAll = asyncHandler(async (req, res, next) => {
        OK(res, 'get rappers success', await ContestantService.getAll())
    })

    getById = asyncHandler(async (req, res, next) => {
        OK(res, 'get rapper by id', await ContestantService.getById(req.params.id))
    })

    update = asyncHandler(async (req, res, next) => {
        OK(res, 'rapper information updated', await ContestantService.update(req.query, req.body))
    })

    delete = asyncHandler(async (req, res, next) => {
        OK(res, 'rapper deleted', await ContestantService.delete(req.query, req.body))
    })
}

module.exports = new ContestantController();