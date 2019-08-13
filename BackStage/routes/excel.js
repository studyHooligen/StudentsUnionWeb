let express = require('express');
let informationDB = require('../models/information_db');
let router = express.Router();
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({ extended: false });
var xlsx = require('node-xlsx');
var fs = require('fs');

// 跨域header设定
router.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

router.get('/download/excel', urlencodedParser, function (req, res, next) {

    var datas = [];
    var cols = ['照片', '姓名', '学号', '性别', '班级', '电话', '第一志愿', '第二志愿', '是否服从调剂', '自我介绍', '爱好'];
    datas.push(cols)
    
	let enrollmentCollection = informationDB.getCollection("StudentUnion","ENROLLMENT");
	enrollmentCollection.find().toArray(function (err, allData) {
        var tows = ['img', 'name', 'uid', 'sex', 'class', 'phone', 'FirstExcept', 'SecondExcept', 'AdjustedOrNot', 'SelfIntroduction', 'hobby'];
        
        let towsLen = tows.length
        let dataLen = allData.length

        for(var i = 0; i < dataLen; ++i){
            let row = [];
            for (let j = 0; j < towsLen; j++){
                row.push(allData[i][tows[j]].toString())
            }
            datas.push(row);
        }

        var buffer = xlsx.build([{name: "学生会招新名单", data: datas}]);
        fs.writeFileSync('/root/front-end/static/excel/students.xlsx', buffer, 'binary');

        
        res.status(200).json({
            code: 1,
            msg:  "导出成功",
            url: "/root/front-end/static/excel/students.xlsx"
        });

	})
});

module.exports = router;