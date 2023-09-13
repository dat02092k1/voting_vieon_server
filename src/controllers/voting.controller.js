'use strict';

const { asyncHandler } = require("../middleware/auth");
const { CREATED, OK } = require("../core/success.response");
const VotingService = require("../services/voting.service");

class VotingController {
    vote = asyncHandler(async (req, res, next) => {
        CREATED(res, 'create success', await VotingService.createVote(req.body))
    })

}

module.exports = new VotingController();