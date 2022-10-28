module.exports = app => {
    const mongoose = app.mongoose;   /*引入建立连接的mongoose */
    const Schema = mongoose.Schema;   
    var d=new Date();
    const AccessSchema = new Schema({
      action_name: { type: String  },      //操作名称
      type: { type: Number  },   //节点类型 :  1、表示模块   2、表示菜单     3、操作
      model:{type:String},
      sort:{
        type:Number,
        default:100
      },
      description:{type: String},
      status:{
        type:Number,
        default:1
      },
      add_time:{
        type:Number,
        default:d.getTime()
      }
    });
    return mongoose.model('Access', AccessSchema,'access');    
}