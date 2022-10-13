/*'use strict';

*/

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const moment = require('moment');
  const CommentSchema = new Schema({
    content: {
      type: String,
      unique: false,
      required: false,
    },
    entityId: {
      type: String,
      unique: false,
      required: true,
    },
    category: {
      type: String,
      unique: false,
      required: false,
    },
    authorName: {
      type: String,
      unique: false,
      required: false,
    },
    parentCommentId: {
      type: String,
      unique: false,
      required: false,
    },
    authorId: {
      type: String,
      unique: false,
      required: false,
    },
    authorImg: {
      type: String,
      unique: false,
      required: false,
    },
    timestamp: {
      type: String,
      unique: false,
      required: false,
    },
    addTime: {
      type: String,
      unique: false,
      required: false,
    },
    course: { 
      type: String, 
      ref: 'Course'
    }, // 指向该评论所属的课程
    isNestedComment: {
       type: Boolean, 
       default: false 
    }, // 是否是评论的回复
    comment: { 
      type: String, 
      ref: 'Comment' 
    }, // 如果该评论是某评论的回复，指向所属的评论
    nestedComment: { 
      type: String, 
      ref: 'Comment'
    }, // 如果该评论是某评论的回复的回复，指向所回复的评论

    // 发布者
    author: {
      type: String,
      ref: 'User',
      autopopulate: true 
    },

    // 是否被锁定
    isBlocked: { 
      type: Boolean, 
      default: false 
    },
    // 是否被删除
    isDeleted: { 
      type: Boolean, 
      default: false 
    },
  });
  return mongoose.model('Comment', CommentSchema);
}
