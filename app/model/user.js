/*'use strict';
};*/

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  var credentialSchema = mongoose.Schema({
    clientType: String,
    openId: String,
    unionId: String,
    sessionKey: String, // wechat only
    accessToken: String, // internal access
  },{ _id : false });

  const UserSchema = new Schema({
    name: {
      type: String,
      unique: true,
      required: false,
    },
    sex: {
      type: String,
      unique: false,
      required: false,
    },
    age:{
      type: String,
      unique: false,
      required: false,
    },
    schoolRecord:{
      type: String,
      unique: false,
      required: false,
    },
    position:{
      type: String,
      unique: false,
      required: false,
    },
    location:{
      type: String,
      unique: false,
      required: false,
    },
    country:{
      type: String,
      unique: false,
      required: false,
    },
    phone:{
      type: String,
      unique: false,
      required: false,
    },
    email:{
      type: String,
      unique: false,
      required: false,
    },
    wechat: {
      type: String,
      unique: false,
      required: false,
    },
    workCondition:{
      type: String,
      unique: false,
      required: false,
    },
    industry:{
      type: String,
      unique: false,
      required: false,
    },
    description: {
      type: String,
      unique: false,
      required: false,
    },
    identity: {
      type: String,
      unique: false,
      required: false,
    },
    detailMsg:{
      type: String,
      unique: false,
      required: false,
    },
   password: {
      type: String,
      unique: false,
      required: false,
    },
    category:{
      type: String,
      unique: false,
      required: false,
    },
    userType:{
      type: String,
      unique: false,
      required: false,
    },
    imgUrl: {
      type: String,
      unique: false,
      required: false,
    },
    iconUrl: {
      type: String,
      unique: false,
      required: false,
    },
    bigCoverUrl: {
        type: String,
        unique: false,
        required: false,
    },
    videos:[{
      type: String,
      unique: false,
      required: false,
    }],
    imgs:[{
      type: String,
      unique: false,
      required: false,
    }],
    docs:[{
      type: String,
      unique: false,
      required: false,
    }],
    growthDescriptions:[{
      type: String,
      unique: false,
      required: false,
    }],
    tags:[{
      type: String,
      unique: false,
      required: false,
    }],
    addTime: {
      type: String,
      unique: false,
      required: false,
    },
    timestamp: {
      type: String,
      unique: false,
      required: false,
    },
  });

  UserSchema.index({ "credential.openId": 1, "credential.openId": 1 });
  UserSchema.index({ accessToken: 1 });

  return mongoose.model('User', UserSchema);
}
