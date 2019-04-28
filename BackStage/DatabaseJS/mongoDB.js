'use strict';
let MongoDB = require('mongodb');
let MongoClient = MongoDB.MongoClient;
let ObjectID = MongoDB.ObjectID;

let mainDB;        //官网主页及各部门主页
let publicOffice;  //公用房
let QiMingStudy;   //启明书屋

//创建连接
MongoClient.connect("mongodb://127.0.0.1:27017",/*{useNewUrlParser:true},*/ (err, client) => {
    if (err) {
        throw err;
    } else {
        mainDB = client.db("HustEic_StudentsUnionWeb");
        publicOffice=client.db("HustEicSUW_PublicOffice");
        QiMingStudy=client.db("HustEicSUW_QiMingStudy");
    }
});　

exports.getIndex = function(){   //获取主页表
    return mainDB.collection("Index");
};

exports.getDepartment = function(departmentName){   //获取各分部门数据表
    return mainDB.collection(departmentName);
};



//insertOne() 为插入操作