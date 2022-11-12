'use strict';
/*const DataLoader = require('dataloader');
const BasicConnector = require('../common/basicConnector');
const moment = require('moment');
const MODEL_NAME = 'User';*/
class LevelChangeConnector /*extends BasicConnector */{

  constructor(ctx, model){
    this.ctx = ctx;
    //this.model = model;
    /*this.loader = new DataLoader(
        ids => this.fetch(ids)
    );*/
  }

  async fetch(ids) {
    return await this.ctx.model.LevelChange.find(null,null,{limit:4},function(err,docs){
      //console.log(docs);
    });
  }

  async fetchById(ids) {
      return await this.ctx.model.LevelChange.find(null,null,{limit:4},function(err,docs){
       // console.log(docs);
      });
  }

  fetchByIds(id) {
      return this.loader.load(id);
  }
  async latestMobileLog(id, option){
    return await this.ctx.model.LevelChange.find(null,null,{limit:option.limit,skip:option.skip},function(err,docs){
      // console.log(docs);
    });
  }



  //add
  async levelUp(userInput) {
    /*var name0 = await this.ctx.model.LevelChange.create({name:"test1",level:"1"},function(err,docs){});
    await this.ctx.model.LevelChange.create({name:"test2",level:"2"},function(err,docs){});
    await this.ctx.model.LevelChange.create({name:"test3",level:"3"},function(err,docs){});*/
    var levelx = await this.ctx.model.User.findOne({
      name:userInput.name
    },null,function (err, docs) {
            //console.log("docs.level=" + docs.level);
    });
    if(levelx.level == 3){
      return {"status":1,"msg":"您已经是永久会员了，无须续费"}
    }
    if(levelx.level == 2){
      return {"status":1,"msg":"您目前已经是会员了"}
    }
    await this.ctx.model.User.updateOne({
      name:userInput.name
    },{
      $set:{level:2}
    })
    
    return {"status": 0, "msg": "您已升级为会员，充值成功"}
  }

  async levelDown(userInput) {
    var levelx = await this.ctx.model.User.findOne({
      name:userInput.name
    },null,function (err, docs) {
            //console.log("docs.level=" + docs.level);
    });
    if(levelx.level == 3){
      return {"status":1,"msg":"您已经是永久会员了，会员到期不会对永久会员有任何影响"}
    }
    if(levelx.level == 1){
      return {"status":1,"msg":"您并不是会员，不存在会员到期"}
    }
    await this.ctx.model.User.updateOne({
      name:userInput.name
    },{
      $set:{level:1}
    })
    
    return {"status": 0, "msg": "您的会员已到期，想继续当会员请续费"}
  }
  //delete
  async mobileLogDelete(id) {

    var model = await this.ctx.model.MobileLog.deleteOne(
        {
          _id:id
        }
    );
    
    await Promise.all([model]);
    model = await model;
    return {"status": 0, "msg": "删除成功"}
  }



}

module.exports = LevelChangeConnector;
