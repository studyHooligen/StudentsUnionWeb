//
//  account.js
//
//  Created by LY on 11/10/2018.
//

let express = require('express');
let informationDB = require('../models/information_db');
let router = express.Router();
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({ extended: false });
var ObjectID = require('mongodb').ObjectID;

// 跨域header设定
router.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});


/*
 * @function 根据账户uid获取账户信息
 * @param uid(string) 账户uid
 * @return account(json对象) 账户信息
 */
router.get('/account', urlencodedParser, function (req, res, next) {
	let params = req.query;
	console.log(params);
	let collection = informationDB.getCollection("", "ACCOUNT");
	collection.findOne({ uid: params.uid }, function (err, data) {
		if (data) {
			res.status(200).json({
                account: data
			});
		}
		else {
			res.status(200).json({ "code": "-1" ,"msg": "查无此人"})
		}

	});
});
