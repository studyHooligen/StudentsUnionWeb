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


informationDB.connect("StudentUnion")

/*
 * @function 管理员登录
 * @param account(string) 账户, password(string) 密码
 * @return code(int) , mag(string)
 */
router.post('/account', urlencodedParser, function (req, res, next) {
	let UserData = {
		account: req.body.account,
		password: req.body.password
	}
	
	let accountCollection = informationDB.getCollection("ACCOUNT");
	accountCollection.findOne({account: UserData.account}, function (err, data) {
		if (data) {
			if (UserData.password == data.password){
				res.status(200).json({ "code": "1" ,"msg": "登陆成功"})
			}
			else {
				res.status(200).json({ "code": "-1" ,"msg": "密码错误"})
			}
		}
		else {
			res.status(200).json({ "code": "-1" ,"msg": "查无此人"})
		}

	});
});


module.exports = router;