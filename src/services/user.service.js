'use strict';

const mongoose = require('mongoose');
const User = require('../models/user.model');

const bcrypt = require('bcrypt');
const crypto = require('crypto');
const {Api403Error, BusinessLogicError, Api401Error} = require('../core/error.response');

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
        const findUser = await User.findById(userId);

        if (!findUser) throw new Api403Error('User not found');

        return {
            user: await User.findById(userId),
        }
    }

    static update = async (userId, data) => {
        const {user} = data;

        const findUser = await User.findById(userId);

        if (!findUser) throw new Api403Error('User not found');

        await User.findByIdAndUpdate(userId, user, { new: true});

        return {
            user: await User.findById(userId),
            message: 'updated'
        }
    }

    static delete = async (userId) => {
        const targetUser = await User.findById(userId);

        if (!targetUser) throw new Api403Error('User not found');

        await User.findByIdAndDelete(userId);

        return {
            message: 'deleted'
        }
    }
}

module.exports = UserService;