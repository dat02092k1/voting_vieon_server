'use strict';

const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const {Api403Error, BusinessLogicError, Api401Error} = require('../core/error.response');
const _ = require("lodash");
const {getInfoData} = require("../utils/utils");

const SAL_ROUNDS = 10;

class UserService {
    static create = async (userDetails) => {
        const {email, password} = userDetails;

         // check user
        const checkUser = await User.findOne({email: email});
        console.log(checkUser);
        if (checkUser) throw new Api403Error('User already exists');

        const hashPassword = await bcrypt.hash(password, SAL_ROUNDS);
        const user = new User(userDetails);
        user.password = hashPassword;
        user.votesRemaining = 1;
        await user.save();
        return user;
    }

    static getAll = async () => {
         return {
            users: await User.find(),
         }
    }

    static getUserById = async (userId) => {
        const findUser = await User.findById(userId).lean();

        if (!findUser) throw new Api403Error('User not found');

        return {
            user: findUser,
        }
    }

    static update = async (userId, data) => {
        const {user} = data;
        console.log(user);
        var findUser = await User.findById(userId);

        if (!findUser) throw new Api403Error('User not found');

        findUser = _.extend(findUser, user);
        // await User.findByIdAndUpdate(userId, user, { new: true});
        await findUser.save();
        return {
            user: getInfoData({fields: ['_id', 'votesRemaining', 'email'], object: findUser}),
            message: 'updated'
        }
    }

    static delete = async (userId) => {
        const targetUser = await User.findById(userId).lean();

        if (!targetUser) throw new Api403Error('User not found');

        await User.findByIdAndDelete(userId);

        return {
            message: 'deleted'
        }
    }
}

module.exports = UserService;