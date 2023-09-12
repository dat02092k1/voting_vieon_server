'use strict'

const _ = require('lodash');
const crypto = require('crypto');

const getInfoData = ({ fields = [], object = {} }) => {
    return _.pick(object, fields);
}

module.exports = {
    getInfoData
};
