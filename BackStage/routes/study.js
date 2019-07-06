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
 * @function 查看所有借阅情况
 * @param borrowTime(string),returnTime(string),continueStatus(bool),place(string),status(bool) 支持条件查询
 * @return data([array])
 */
router.get('/admin/checkBorrowedBook',urlencodedParser,function(req,res,next){
	let checkCondition={}
	let cache
	//console.log(req.body.borrowTime);
	if(cache=req.body.borrowTime) checkCondition.borrowTime=JSON.parse(cache);//如果前端给的不是JSON是字符串，则需要转换
	if(cache=req.body.returnTime) checkCondition.returnTime=JSON.parse(cache);//同上
	if(cache=req.body.continueStatus) checkCondition.continueStatus=cache;
	if(cache=req.body.place) checkCondition.place=cache;
	if(cache=req.body.status) checkCondition.status=cache;
	//console.log(checkCondition);

	BorrowedCollection=informationDB.getCollection('QimingStudy','BORROW');

	BorrowedCollection.find(checkCondition).toArray(function(err,allData){
		res.status(200).json({
			data : allData
		})
	})
})

/*
 * @function 查看当个指定用户情况
 * @param uid(string)
 * @return data([array])
 */
router.get('/checkSingleUser',urlencodedParser,function(req,res,next){
	AccountCollection=informationDB.getCollection('QimingStudy','ACCOUNT');
	BorrowingCollection=informationDB.getCollection('QimingStudy','BORROW');
	HistoryCollecion=informationDB.getCollection('QimingStudy','HISTORY');
	
	AccountCollection.findOne({uid : req.body.uid},function(err,userD){
		borrowingData=BorrowingCollection.find({'_id' : {'$in' : userD.borrowing} }).toArray();
		historyData=HistoryCollecion.find({'_id' : {'$in' : userD.history} }).toArray();

		res.status(200).json({
			'borrowing' : borrowingData,
			'history' : historyData
	})
	});
	
})

/*
 * @function 用户借书
 * @param uid(string),bid(string)
 * @return data([array])
 */
router.post('/borrowBook',urlencodedParser,function(req,res,next){
	//假设前端已完成登录
	BookCollection=informationDB.getCollection('QimingStudy','BOOKS');
	UserCollection=informationDB.getCollection('QimingStudy','ACCOUNT');
	BorrowCollection=informationDB.getCollection('QimingStudy','BORROW');

	let userDetail;
	BookCollection.findOne({bid : req.body.bookID},function(err,bookSituation){
		if(err) console.log("ERROR:" + err);
		else{
			//console.log(bookSituation)  //测试打开
			if(!bookSituation) {res.status(200).json({ code : -1 , msg : "书籍不在架上"}); return;}
			else if(!bookSituation.availNum) res.status(200).json({code : -1, msg : "书籍已借光"});
				else {
					UserCollection.findOne({uid : req.body.uid},function(err,userD){
						//console.log(userD);  //测试打开
						if(userD.borrowing.length>=5) res.status(200).json({code : -1, msg :"没有权限借书"});
						else{
							let nowDate= new Date();

							BorrowCollection.insertOne({  //书籍借用情况中加一条记录
								book : {
									bookID : bookSituation.bid,
									book : bookSituation.book
								},
								borrower : {
									uid : userD.uid,
									user : userD.user
								},
								borrowTime : {
									year : nowDate.getFullYear(),
									month : nowDate.getMonth(),
									day : nowDate.getDay()
								},
								returnTime:{
									year : 0,
									month : 0,
									day : 0
								},
								place : "",
								continueTime : 0
							},function(err,insertD){
								//console.log(insertD.ops[0]);  //测试打开
								//书籍可借用量-1
								BookCollection.updateOne({bid : req.body.bookID} ,
									{'$set' : {'availNum' : bookSituation.availNum-1} });
								
								//用户记录更新
								UserCollection.updateOne({uid : req.body.uid},
									{'$set' : {borrowing : Array(userD.borrowing).push(insertD.ops[0]._id)}});
	
								res.status(200).json({
									"code" : 1,
									'msg' : '操作成功'
								})
							});
							

							
						}
					})
				}
		}
	});
});

/*
 * @function 用户预约归还图书
 * @param _id(string)
 * @return code(int),msg(string)
 */
router.post('/admin/returnBook',urlencodedParser,function(req,res,next){
	BookCollection=informationDB.getCollection('QimingStudy','BOOKS');
	UserCollection=informationDB.getCollection('QimingStudy','ACCOUNT');
	BorrowCollection=informationDB.getCollection('QimingStudy','BORROW');
	HistoryCollecion=informationDB.getCollection('QimingStudy','HISTORY');

	BorrowCollection.findOne({'_id' : ObjectID(req.body._id)},function(err,borrowingData){
		if(!borrowingData) {res.status(200).json({ 'code' : -1 , 'msg' : '错误'}); return;}
		BorrowCollection.updateOne({'_id' : ObjectID(req.body._id)},
			{'$set' : {
				'place' : req.body.place,
				'returnTime' : JSON.parse(req.body.time)
			} });
		res.status(200).json({'code' : 1, 'msg' : '预约归还成功'});
	});
})

/*
 * @function 用户续借书籍
 * @param _id(string),continueTime(int)
 * @return code(int),msg(string)
 */
router.post('/continueBorrow',urlencodedParser,function(req,res,next){
	BorrowCollection=informationDB.getCollection('QimingStudy','BORROW');

	BorrowCollection.findOne({'_id' : ObjectID(req.body._id)},function(err,cache){
		if(!cache && cache.continueTime) res.status(200).json({'code' : -1, 'msg' : "Sorry!"});
		else {
			BorrowCollection.update({'_id' : ObjectID(req.body._id)},
			{'$set' : {
				continueTime : req.body.continueTime
			}})

			res.status(200).json({
				'code' : 1,
				'msg' : "续借成功"
			})
		}
	})
})

module.exports = router;