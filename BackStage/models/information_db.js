'use strict';

let ConfigSet = require('../configs/config_set.json');
let MongoDB = require('mongodb');
let MongoClient = MongoDB.MongoClient;
let ObjectID = require('mongodb').ObjectID;

let db;


exports.connect = function(DATABASE_NAME){
    MongoClient.connect(ConfigSet.DATABASE_URL,{useNewUrlParser:true}, (err, client) => {
        if (err) {
            throw err;
        } else {
            db = client.db(DATABASE_NAME);
        }
    });
}

exports.getCollection = function(COLLECTION_NAME){
    return db.collection(COLLECTION_NAME);
};
