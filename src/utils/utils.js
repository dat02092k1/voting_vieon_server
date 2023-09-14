'use strict'
const jwt = require('jsonwebtoken');
require('dotenv').config();
const _ = require('lodash');
const crypto = require('crypto');

const getInfoData = ({ fields = [], object = {} }) => {
    return _.pick(object, fields);
}

const generateAccessToken = (user) => {
    return jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1d'});
}

module.exports = {
    getInfoData, generateAccessToken
};
