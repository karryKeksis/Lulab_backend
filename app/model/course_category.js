module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const d = new Date();

  const CourseCategorySchema = new Schema({
    title: { type: String },
    sort: { type: Number },
    description: { type: String },
    status: { type: Number, default: 1 },
    createdAt: {
      type: Number,
      default: d.getTime(),
    },
    updatedAt: {
      type: Number,
    },

  });


  const CourseCategory = mongoose.model('CourseCategory', CourseCategorySchema, 'coursecategory');

  initUserData(CourseCategory);
  return CourseCategory;
};


function initUserData(User) {
  // 查询数据库
  User.find({}, (err, doc) => {
    if (err) {
      console.log(err);
      console.log('创建用户失败');
    } else if (!doc.length) {
      new User({
        title: '理论课程',
        sort: 1,
        createdAt: Date.now(),
      }).save();
    } else {
      console.log('-------------创建分类成功--------------');
    }
  });
}
