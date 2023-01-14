module.exports = app => {
  const mongoose = app.mongoose;   
  const Schema = mongoose.Schema;   

  const AccessSchema = new Schema({
    // 功能名称
    name: {
      type: String,
      unique: true,
      required: false,
    },   
    // 功能对应的url
    url: {
      type: String
    },
    // 功能对应的请求方法
    action: {
      type: String
    }
  });
  return mongoose.model('Access', AccessSchema);    
} 