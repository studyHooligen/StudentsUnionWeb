'use strict';

let ConfigSet = require('../configs/config_set.json');
let MongoDB = require('mongodb');
let MongoClient = MongoDB.MongoClient;

let client;
let database;

exports.connect = function(){
    MongoClient.connect(ConfigSet.DATABASE_URL,{useNewUrlParser:true}, (err, tempClient) => {
        if (err) {
            throw err;
        } else {
            client = tempClient;
        }
    });
}


exports.getCollection = function(DATABASE_NAME,COLLECTION_NAME){
    database = client.db(DATABASE_NAME);
    return database.collection(COLLECTION_NAME);
};