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
            imgsMapCollection.insert(imgs);
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
			popupViewCollection.save(message);
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
router.delete('/message', urlencodedParser, function (req, res, next) {

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
        img: req.body.ing
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
router.delete('/stars', urlencodedParser, function (req, res, next) {

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

    let dataCenterCollection = informationDB.getCollection("pageViewer","dataCenter");

	dataCenterCollection.find().toArray(function (err, allData) {
        res.status(200).json({data: allData})
	})

});

//资料中心
router.delete('/dataCenter', urlencodedParser, function (req, res, next) {

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

//权益中心
router.post('/equityCenter', urlencodedParser, function (req, res, next) {
	let equityCenter = {
        index: req.body.index,
		time: req.body.time,
        title: req.body.title,
        content: req.body.content,
        speed: req.body.speed,
        resolvent: req.body.resolvent,
	}
	
    let equityCenterCollection = informationDB.getCollection("pageViewer","equityCenter");
    
	equityCenterCollection.findOne({index: equityCenter.index}, function (err, data) {
		if (data) {
            equityCenter._id = ObjectID(data._id)
			equityCenterCollection.save(equityCenter);
			res.status(200).json({ "code": "1" ,"msg": "修改成功"})
		}
		else {
            equityCenterCollection.insert(equityCenter);
			res.status(200).json({ "code": "1" ,"msg": "提交成功"})
		}
    }
    );
});


//权益中心
router.get('/equityCenter', urlencodedParser, function (req, res, next) {

    let equityCenterCollection = informationDB.getCollection("pageViewer","equityCenter");

	equityCenterCollection.find().toArray(function (err, allData) {
        res.status(200).json({data: allData})
	})

});

//权益中心
router.delete('/equityCenter', urlencodedParser, function (req, res, next) {

    let index = req.body.index;

    let equityCenterCollection = informationDB.getCollection("pageViewer","equityCenter");
    
	equityCenterCollection.findOne({ index : index}, function (err, data) {
		if (data) {
            equityCenterCollection.remove({index: index});
			res.status(200).json({ "code": "1" ,"msg": "删除成功"})
		}
		else {
			res.status(200).json({ "code": "-1" ,"msg": "没有这条消息"})
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
router.delete('/imgNews', urlencodedParser, function (req, res, next) {

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
        tegs: req.body.tags
	}
	
    let PsychologyBoardCollection = informationDB.getCollection("pageViewer","PsychologyBoard");
    let PsychologyBoardTagCollection = informationDB.getCollection("pageViewer","PsychologyBoardTag");

    PsychologyBoardCollection.insert(postmessage);

	PsychologyBoardCollection.findOne({}, function (err, data) {
		if (data) {
            let messageId = data._id;
            for(tag in postmessage.tags){
                PsychologyBoardTagCollection.findOne({tag: tag}, function (err, tagData) {
                    if(tagData) {
                        tagData.messages.append(messageId);
                        PsychologyBoardTagCollection.update({tag: tag}, {$set:{'messages': tagData.messages}})
                    }
                    else{
                        let tagItem = {
                            tag: tag,
                            messages: []
                        }
                        tagItem.messages.append(messageId);
                        PsychologyBoardTagCollection.insert(tagItem);
                    }
                });
            }
            res.status(200).json({ "code": "1" ,"msg": "提交成功"})
		}
    });

});

//心理宣泄版
router.post('/PsychologyBoard/Reply', urlencodedParser, function (req, res, next) {
	let replymessage = {
        content: req.body.content,
        id: req.body.id
	}
	
    let PsychologyBoardCollection = informationDB.getCollection("pageViewer","PsychologyBoard");

	PsychologyBoardCollection.findOne({_id: ObjectID(replymessage.id)}, function (err, data) {
		if (data) {
            data.reply.append(replymessage.content);
            PsychologyBoardCollection.update({_id: ObjectID(replymessage.id)}, {$set:{'reply': data.reply}})
            res.status(200).json({ "code": "1" ,"msg": "提交成功"})
        }
        else{
            res.status(200).json({ "code": "-1" ,"msg": "没有这条消息"})
        }
    });

});

// //心理宣泄版
// router.get('/PsychologyBoard', urlencodedParser, function (req, res, next) {
//     let params = req.query;

//     let PsychologyBoardCollection = informationDB.getCollection("pageViewer","PsychologyBoard");

// 	PsychologyBoardCollection.findOne({_id: ObjectID(params.id)}, function (err, data) {
// 		if (data) {

//             res.status(200).json({ "code": "1" ,data: "提交成功"})
//         }
//         else{
//             res.status(200).json({ "code": "-1" ,"msg": "没有这条消息"})
//         }
//     });


// });

module.exports = router;