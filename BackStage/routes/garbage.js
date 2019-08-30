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

router.get('/garbageSort', urlencodedParser, function (req, res, next) {
    let garbageName = req.body.garbagename;
    console.log(garbageName);
    let garbageCollection = informationDB.getCollection("GARBAGESORT","garbageData");
    let garbageUnkownCollection = informationDB.getCollection("GARBAGESORT","garbageUnknown");
    

    garbageCollection.findOne({name : garbageName},function(err,data){
        if(data)
        {
            res.status(200).json({
                code : 1,
                garbage:    data,
                msg:    "查询成功"
            });
        }
        else{
            garbageUnkownCollection.insert({name : garbageName});
            res.status(200).json({
                code:   -1,
                garbage:    null,
                msg:    "查询不到"
            })
        }
    })
});

module.exports = router;