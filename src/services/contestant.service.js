'use strict';

const Vote = require('../models/vote.model');
const Constestant = require('../models/contestant.model');
const User = require('../models/user.model');
const {Api403Error, BusinessLogicError, Api401Error} = require('../core/error.response');
const {getInfoData} = require("../utils/utils");

class ContestantService {
    static createVote = async (data) => {
        const {rapper} = data;
        console.log('rapper', rapper)
        const targetRapper = await Constestant.findOne({'candicateId': rapper.candicateId});

        if (targetRapper) throw new Api403Error('Rapper existed');

        const newRapper = new Constestant(rapper);

        await newRapper.save();

        return {
            message: 'Rapper created',
            rapper: getInfoData({ fields: ['candicateId', 'name', 'imgUrl'], object: newRapper })
        }
    }

    static getAll = async () => {
        return {
            users: await User.find(),
        }
    }
}

module.exports = ContestantService;