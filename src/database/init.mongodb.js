"use strict";

const mongoose = require("mongoose");
const { database: {host, name, password}} = require('../configs/config.mongodb.js');
// const connectString = `mongodb://${host}:${port}/${name}`;
const proConnectString = `mongodb+srv://${host}:${password}@${name}.mzollsw.mongodb.net/`;
console.log(proConnectString);
class Database {
    constructor() {
        this.connect()
    }

    // connect
    connect(type = 'mongodb') {
        if (1 === 1) {
            mongoose.set('debug', true);
            mongoose.set('debug', { color: true });
        }

        mongoose.connect(proConnectString, {
            maxPoolSize: 50
        })
            .then((_) => console.log("DB connected"))
            .catch((err) => console.log('Error connect'));
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;