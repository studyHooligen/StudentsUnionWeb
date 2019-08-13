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

//首页弹窗
router.post('/PopupView', urlencodedParser, function (req, res, next) {
	let PopupView = {
		name: req.body.name,
        url: req.body.url,
        img: req.body.img
	}
	
    let popupViewCollection = informationDB.getCollection("pageViewer","popupView");
    
	popupViewCollection.findOne({}, function (err, data) {
		if (data) {
            PopupView._id = ObjectID(data._id)
			popupViewCollection.save(PopupView);
			res.status(200).json({ "code": "1" ,"msg": "修改成功"})
		}
		else {
            popupViewCollection.insert(PopupView);
			res.status(200).json({ "code": "1" ,"msg": "提交成功"})
		}
    }
    );
});

//首页弹窗
router.get('/PopupView', urlencodedParser, function (req, res, next) {

    let popupViewCollection = informationDB.getCollection("pageViewer","popupView");

	popupViewCollection.findOne({}, function (err, data) {
		if(data){
			res.status(200).json({data: data})
		}
		else{
			res.status(200).json({data: {}})
		}

	});

});

//轮播图
router.post('/imgsMap', urlencodedParser, function (req, res, next) {
	console.log(req.body)
	let imgs = req.body.imgs;
	
    let imgsMapCollection = informationDB.getCollection("pageViewer","imgsMap");
	
	imgsMapCollection.findOne({}, function (err, data) {
		if (data) {
            let datatemp = {
                imgs : imgs
			}
            datatemp._id = ObjectID(data._id)
			imgsMapCollection.save(datatemp);
			res.status(200).json({ "code": "1" ,"msg": "修改成功"})
		}
		else {
            imgsMapCollection.insert({imgs: imgs});
			res.status(200).json({ "code": "1" ,"msg": "提交成功"})
		}
    }
    );
});

//轮播图
router.get('/imgsMap', urlencodedParser, function (req, res, next) {

    let imgsMapCollection = informationDB.getCollection("pageViewer","imgsMap");

	imgsMapCollection.findOne({}, function (err, data) {
		if(data){
			res.status(200).json({data: data})
		}
		else{
			res.status(200).json({data: {}})
		}

	});

});


//重要消息
router.post('/message', urlencodedParser, function (req, res, next) {
	let message = {
        index: req.body.index,
		time: req.body.time,
        title: req.body.title,
        content: req.body.content
	}
	
    let messageCollection = informationDB.getCollection("pageViewer","message");
    
	messageCollection.findOne({index: message.index}, function (err, data) {
		if (data) {
            message._id = ObjectID(data._id)
			messageCollection.save(message);
			res.status(200).json({ "code": "1" ,"msg": "修改成功"})
		}
		else {
            messageCollection.insert(message);
			res.status(200).json({ "code": "1" ,"msg": "提交成功"})
		}
    }
    );
});

//重要消息
router.get('/message', urlencodedParser, function (req, res, next) {

    let messageCollection = informationDB.getCollection("pageViewer","message");

	messageCollection.find().toArray(function (err, allData) {
        res.status(200).json({data: allData})
	})

});

//重要消息
router.post('/message/delete', urlencodedParser, function (req, res, next) {

	let index = req.body.index;

    let messageCollection = informationDB.getCollection("pageViewer","message");

	messageCollection.findOne({index: index}, function (err, data) {
		if (data) {
            messageCollection.remove({index: index});
			res.status(200).json({ "code": "1" ,"msg": "删除成功"})
		}
		else {
			res.status(200).json({ "code": "-1" ,"msg": "没有这条消息"})
		}
    });

});


//每月之星
router.post('/stars', urlencodedParser, function (req, res, next) {
	let star = {
        index: req.body.index,
		time: req.body.time,
        name: req.body.name,
        content: req.body.content,
        img: req.body.img
	}
	
    let starsCollection = informationDB.getCollection("pageViewer","stars");
    
	starsCollection.findOne({index: star.index}, function (err, data) {
		if (data) {
            star._id = ObjectID(data._id)
			starsCollection.save(star);
			res.status(200).json({ "code": "1" ,"msg": "修改成功"})
		}
		else {
            starsCollection.insert(star);
			res.status(200).json({ "code": "1" ,"msg": "提交成功"})
		}
    }
    );
});


//每月之星
router.get('/stars', urlencodedParser, function (req, res, next) {

    let starsCollection = informationDB.getCollection("pageViewer","stars");

	starsCollection.find().toArray(function (err, allData) {
        res.status(200).json({data: allData})
	})

});

//每月之星
router.post('/stars/delete', urlencodedParser, function (req, res, next) {

    let index = req.body.index;

    let starsCollection = informationDB.getCollection("pageViewer","stars");
    
	starsCollection.findOne({index: index}, function (err, data) {
		if (data) {
            starsCollection.remove({index: index});
			res.status(200).json({ "code": "1" ,"msg": "删除成功"})
		}
		else {
			res.status(200).json({ "code": "-1" ,"msg": "查无此人"})
		}
    });

});


//资料中心
router.post('/dataCenter', urlencodedParser, function (req, res, next) {
	let dataCenter = {
        index: req.body.index,
		time: req.body.time,
        title: req.body.title,
        content: req.body.content,
        url: req.body.url,
		code: req.body.code,
		tag: req.body.tag
	}
	
    let dataCenterCollection = informationDB.getCollection("pageViewer","dataCenter");
    
	dataCenterCollection.findOne({index: dataCenter.index}, function (err, data) {
		if (data) {
            dataCenter._id = ObjectID(data._id)
			dataCenterCollection.save(dataCenter);
			res.status(200).json({ "code": "1" ,"msg": "修改成功"})
		}
		else {
            dataCenterCollection.insert(dataCenter);
			res.status(200).json({ "code": "1" ,"msg": "提交成功"})
		}
    }
    );
});


//资料中心
router.get('/dataCenter', urlencodedParser, function (req, res, next) {
	tag = req.query.tag

    let dataCenterCollection = informationDB.getCollection("pageViewer","dataCenter");

	dataCenterCollection.find({tag: tag}).toArray(function (err, allData) {
        res.status(200).json({data: allData})
	})

});

//资料中心
router.post('/dataCenter/delete', urlencodedParser, function (req, res, next) {

    let index = req.body.index;

    let dataCenterCollection = informationDB.getCollection("pageViewer","dataCenter");
    
	dataCenterCollection.findOne({index: index}, function (err, data) {
		if (data) {
            dataCenterCollection.remove({index: index});
			res.status(200).json({ "code": "1" ,"msg": "删除成功"})
		}
		else {
			res.status(200).json({ "code": "-1" ,"msg": "没有这个资料"})
		}
    });

});


//图片新闻
router.post('/imgNews', urlencodedParser, function (req, res, next) {
	let imgnew = {
        index: req.body.index,
		time: req.body.time,
        title: req.body.title,
        content: req.body.content,
        img:   req.body.img
	}
	
    let imgNewsrCollection = informationDB.getCollection("pageViewer","imgNews");
    
	imgNewsrCollection.findOne({index: imgnew.index}, function (err, data) {
		if (data) {
            imgnew._id = ObjectID(data._id)
			imgNewsrCollection.save(imgnew);
			res.status(200).json({ "code": "1" ,"msg": "修改成功"})
		}
		else {
            imgNewsrCollection.insert(imgnew);
			res.status(200).json({ "code": "1" ,"msg": "提交成功"})
		}
    }
    );
});


//图片新闻
router.get('/imgNews', urlencodedParser, function (req, res, next) {

    let imgNewsrCollection = informationDB.getCollection("pageViewer","imgNews");

	imgNewsrCollection.find().toArray(function (err, allData) {
        res.status(200).json({data: allData})
	})

});

//图片新闻
router.post('/imgNews/delete', urlencodedParser, function (req, res, next) {

    let index = req.body.index;

    let imgNewsrCollection = informationDB.getCollection("pageViewer","imgNews");
    
	imgNewsrCollection.findOne({index: index}, function (err, data) {
		if (data) {
            imgNewsrCollection.remove({index: index});
			res.status(200).json({ "code": "1" ,"msg": "删除成功"})
		}
		else {
			res.status(200).json({ "code": "-1" ,"msg": "没有这条新闻"})
		}
    });

});

//心理宣泄版
router.post('/PsychologyBoard/send', urlencodedParser, function (req, res, next) {
	let postmessage = {
        content: req.body.content,
        reply: [],
		tags: req.body.tags,
		color: req.body.color,
		size: req.body.size,
		index: req.body.index
	}

	console.log(req.body)
	postmessage.tags = JSON.parse(postmessage.tags)
	postmessage.tags = Array.from(new Set(postmessage.tags));

	console.log(postmessage)
	
    let PsychologyBoardCollection = informationDB.getCollection("pageViewer","PsychologyBoard");
    let PsychologyBoardTagCollection = informationDB.getCollection("pageViewer","PsychologyBoardTag");

    PsychologyBoardCollection.insert(postmessage);

	PsychologyBoardCollection.findOne({}, function (err, data) {
		if (data) {
            for(x in postmessage.tags){
				(function(x){
					console.log(postmessage.tags[x])
					PsychologyBoardTagCollection.findOne({tag: postmessage.tags[x]}, function (err, tagData) {
						if(tagData) {
							console.log(tagData)
							PsychologyBoardCollection.findOne({index: postmessage.index}, function (err, data) {
								tagData.messages.push(data);
								PsychologyBoardTagCollection.update({tag: postmessage.tags[x]}, {$set:{'messages': tagData.messages}})
							});
						}
						else{
							let tagItem = {
								tag: postmessage.tags[x],
								messages: []
							}
							PsychologyBoardCollection.findOne({index: postmessage.index}, function (err, data) {
								tagItem.messages.push(data);
								PsychologyBoardTagCollection.insert(tagItem);
							});
						}
					});
				}) (x);
            }
            res.status(200).json({ "code": "1" ,"msg": "提交成功"})
		}
		else{
			res.status(200).json({ "code": "-1" ,"msg": "提交失败"})
		}
		
    });

});

//心理宣泄版
router.post('/PsychologyBoard/Reply', urlencodedParser, function (req, res, next) {
	let replymessage = {
        content: req.body.content,
		index: req.body.index,
		name: req.body.name
	}

	console.log(req.body)
	
    let PsychologyBoardCollection = informationDB.getCollection("pageViewer","PsychologyBoard");

	PsychologyBoardCollection.findOne({index: replymessage.index}, function (err, data) {
		if (data) {
			data.reply.push(replymessage)
            PsychologyBoardCollection.update({index: replymessage.index}, {$set:{'reply': data.reply}})
            res.status(200).json({ "code": "1" ,"msg": "提交成功"})
        }
        else{
            res.status(200).json({ "code": "-1" ,"msg": "没有这条消息"})
        }
    });

});

//心理宣泄版
router.get('/PsychologyBoard', urlencodedParser, function (req, res, next) {

    let PsychologyBoardCollection = informationDB.getCollection("pageViewer","PsychologyBoard");

	PsychologyBoardCollection.find().sort({"_id":-1}).toArray(function (err, allData) {
        res.status(200).json({data: allData})
	})

});

//心理宣泄版
router.get('/PsychologyBoard/getTags', urlencodedParser, function (req, res, next) {

    let PsychologyBoardTagCollection = informationDB.getCollection("pageViewer","PsychologyBoardTag");

	PsychologyBoardTagCollection.find().toArray(function (err, allData) {
        res.status(200).json({data: allData})
	})

});

//心理宣泄版
router.get('/PsychologyBoard/getByTag', urlencodedParser, function (req, res, next) {

	let tag = req.query.tag;

	let PsychologyBoardTagCollection = informationDB.getCollection("pageViewer","PsychologyBoardTag");

	PsychologyBoardTagCollection.find({tag: tag}).sort({"_id":-1}).toArray(function (err, allData) {
        res.status(200).json({data: allData})
	})

});

//权益中心
router.post('/RightCenter', urlencodedParser, function (req, res, next) {
	let RightCenter = {
        name: req.body.name,
		class: req.body.class,
		uid: req.body.uid,
		phone: req.body.phone,
		email: req.body.email,
		questionName: req.body.questionName,
		question: req.body.question,
		solution: "",
		tag: '0',
		commitData: getDate(),
		tagData: "",
		solveData: ""
	}
	
	let RightCenterCollection = informationDB.getCollection("pageViewer","RightCenter");
	
	RightCenterCollection.insert(RightCenter);

	res.status(200).json({ "code": "1" ,"msg": "提交成功"})

});

//权益中心
router.get('/RightCenter/myQuestion', urlencodedParser, function (req, res, next) {
	let params = req.query;

	let RightCenterCollection = informationDB.getCollection("pageViewer","RightCenter");

	RightCenterCollection.find({name: params.name, email: params.email}).toArray(function (err, allData) {
        res.status(200).json({data: allData})
	})

});

//权益中心
router.get('/RightCenter', urlencodedParser, function (req, res, next) {
	let RightCenterCollection = informationDB.getCollection("pageViewer","RightCenter");

	RightCenterCollection.find({}).toArray(function (err, allData) {
        res.status(200).json({data: allData})
	})

});

//权益中心
router.get('/RightCenter/getByTag', urlencodedParser, function (req, res, next) {
	let tag = req.query.tag;

	let RightCenterCollection = informationDB.getCollection("pageViewer","RightCenter");

	RightCenterCollection.find({tag: tag}).toArray(function (err, allData) {
        res.status(200).json({data: allData})
	})

});

//权益中心
router.post('/RightCenter/setTag', urlencodedParser, function (req, res, next) {
	let tag = req.body.tag;
	let id = req.body.id;

	let RightCenterCollection = informationDB.getCollection("pageViewer","RightCenter");

	RightCenterCollection.findOne({_id: ObjectID(id)}, function (err, data) {
		if(data) {
			RightCenterCollection.update({_id: ObjectID(id)}, {$set:{'tag': tag, 'tagData': getDate()}})
			res.status(200).json({ "code": "1" ,"msg": "修改成功"})
		}
		else{
			res.status(200).json({ "code": "-1" ,"msg": "没有这个问题"})
		}
	});

});


//权益中心
router.post('/RightCenter/setSolution', urlencodedParser, function (req, res, next) {
	let solution = req.body.solution;
	let id = req.body.id;

	let RightCenterCollection = informationDB.getCollection("pageViewer","RightCenter");

	RightCenterCollection.findOne({_id: ObjectID(id)}, function (err, data) {
		if(data) {
			RightCenterCollection.update({_id: ObjectID(id)}, {$set:{'solution': solution, 'solveData': getDate(), 'tag': '2'}})
			res.status(200).json({ "code": "1" ,"msg": "修改成功"})
		}
		else{
			res.status(200).json({ "code": "-1" ,"msg": "没有这个问题"})
		}
	});

});

router.post('/count', urlencodedParser, function (req, res, next) {

	let countCollection = informationDB.getCollection("pageViewer","count");
	
	let today = getDate();

	countCollection.findOne({date: today}, function (err, data) {
		if(data){
			countCollection.update({_id: ObjectID(data._id)}, {$set:{'count': data.count + 1}})
			res.status(200).json({count: data.count + 1})
		}
		else{
			let countData = {
				date: today,
				count: 1
			}
			countCollection.insert(countData)
			res.status(200).json({count: 1})
		}

	});

});

router.get('/count', urlencodedParser, function (req, res, next) {

	let countCollection = informationDB.getCollection("pageViewer","count");
	
	let today = getDate();

	countCollection.findOne({date: today}, function (err, data) {
		if(data){
			res.status(200).json(data)
		}
		else{
			res.status(200).json({count: 0, date: today})
		}

	});

});

router.get('/Allcount', urlencodedParser, function (req, res, next) {

	let countCollection = informationDB.getCollection("pageViewer","count");

	countCollection.find().toArray(function (err, allData) {
        res.status(200).json({data: allData})
	})

});


function getDate() {
	var date = new Date();
	var seperator1 = "-";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = year + seperator1 + month + seperator1 + strDate;
	return currentdate;
}

module.exports = router;