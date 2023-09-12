'use strict';

const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../models/user.model');

const { Api403Error, BusinessLogicError, Api401Error } = require('../core/error.response');
const {getInfoData} = require("../utils/utils");

const RoleShop = {
    STUDENT: "user",
    ADMIN: "admin",
}

class AccessService {
    static login = async ({ email, password }) => {
        console.log({ email });
        // 1.
        const user = await User.findOne({email});

        if (!user) {
            throw new Api403Error('Error: User not registered');
        }

        // 2.
        const match = bcrypt.compare(password, user.password);

        if (!match) throw new Api401Error('Authentication error');

        return {
            metadata: {
                user: getInfoData({ fields: ['_id', 'votesRemaining', 'email'], object: user }),
            }
        }

    }

    static signUp = async ({  email, password }) => {
        // s1: check email existence
        const hodelUser = await User.findOne({ email }).lean(); // return JS object

        if (hodelUser) {
            throw new Api403Error('Error: user already exists');
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = await User.create({
             email, password: passwordHash
        })

        if (newUser) {
            return {
                code: 201,
                metadata: {
                    user: getInfoData({ fields: ['votesRemaining', 'email'], object: newUser }),
                }
            }
        }

        return {
            code: 200,
            metadata: null
        }
    }

    static logout = async (keyStore) => {
        console.log(keyStore);
        const delKey = await keyTokenService.removeKeyById(keyStore._id);
        console.log(delKey);
        return delKey;
    }
}

module.exports = AccessService;