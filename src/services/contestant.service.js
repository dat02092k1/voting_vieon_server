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
            rapper: getInfoData({fields: ['candicateId', 'name', 'imgUrl'], object: newRapper})
        }
    }

    static getAll = async () => {
        const rappers = await Constestant.find();
        return {
            result: {
                rappers: rappers.map(rapper => getInfoData({fields: ['candicateId', 'name', 'imgUrl', 'description'], object: rapper}))
            }
        }
    }

    static getById = async (candicateId) => {
        const targetRapper = await Constestant.findOne({'candicateId': candicateId});

        if (!targetRapper) throw new Api403Error('Cant found rapper with this candicate id');

        return {
            rapper: getInfoData({fields: ['candicateId', 'name', 'imgUrl'], object: targetRapper})
        }
    }

    static delete = async (query) => {
        const {candicateId} = query;

        const targetRapper = await Constestant.findOne({'candicateId': candicateId});

        if (!targetRapper) throw new Api403Error('Cant found rapper with this candicate id');

        await targetRapper.deleteOne({'candicateId': candicateId});

        return {
            rapper: getInfoData({fields: ['candicateId', 'name', 'imgUrl'], object: targetRapper})
        }
    }

    static update = async (query, data) => {
        const {candicateId} = query;
        const {rapper} = data;
        console.log(rapper);
        const targetRapper = await Constestant.findOne({'candicateId': candicateId});

        if (!targetRapper) throw new Api403Error('Cant found rapper with this candicate id');

        if (rapper.name) {
            targetRapper.name = rapper.name;
        }
        if (rapper.description) {
            targetRapper.description = rapper.description;
        }
        if (rapper.candicate_id) {
            targetRapper.candicateId = rapper.candicate_id;
        }

        await targetRapper.save();

        return {
            rapper: getInfoData({fields: ['candicateId', 'name', 'imgUrl'], object: targetRapper})
        }
    }
}

module.exports = ContestantService;