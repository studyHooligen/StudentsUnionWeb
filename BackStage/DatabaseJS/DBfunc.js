'use strict';
let AllDB=require("../DatabaseJS/mongoDB");

//开始获得各个数据库集合
let ACCOUNTS=AllDB.getAccountDB();
let PUBLICOFFICE=AllDB.getPublicOfficeDB();
let ADVERTISEMENT=AllDB.getAdverDB();
let MEETSTATUS=AllDB.getMeetDB();
let FEEDBACK=AllDB.getFeedbackDB();

/************增*******************/
exports.addPuboffice=function(details)
{//添加公用房使用申请
    PUBLICOFFICE.insertOne({
        "department":details.department,  //申请使用的部门
        "date":details.date,    //使用日期
        "description":details.desc    //备注描述使用内容
    },function(err,resault){
        if(err)   throw err;
        console.log(resault);
    })
}

/************删*******************/
exports.deletePuboffice=function(id)
{//删除该公用房申请或使用记录
    PUBLICOFFICE.deleteOne({"_id":id},function(err,resault){
        if(err)  throw err;
        console.log("Having deleted a item of public office use datas(id:"+id+")");
    })
}

/************改*******************/


/************查*******************/
exports.ifUserExist=function(accountString)
{//查找是否含有该用户，返回有（true）或无（false）
    let resault;
    ACCOUNTS.find({"userAccount":accountString}).toArray(function(err,doc){
        if(err)
        {
            console.log("Some error happen!!!");
            return;
        }
        resault=doc;
    })
    if(resault)   //如果查询结果非空
    {
        console.log("User exist,login.");
        return true;
    }
    return false;
};

exports.getPower=function(accountString)
{//获取已存在用户的权限
    let resault;
    ACCOUNTS.findOne({"userAccount":accountString},function(err,doc){
        if(err) throw err;
        resault=doc.userPower;
    })
    return resault;
};

/***************排序***************/