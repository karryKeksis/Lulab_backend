module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const CourseSchema = new Schema({
    title: { type: String },
    classTags: { type: String },
    imageUrl: { type: String, default: 'http://qn3.proflu.cn/default.jpg' },
    author: { type: String },
    authorTags: { type: String },
    description: { type: String },
    onlineTime: { type: String },
    addTime: { type: String },
    updateTime: { type: String },
    sort: { type: Number },
    category_id: { type: Schema.Types.ObjectId },
  }, {
    timestamps: true,
  });

  const Course = mongoose.model('Course', CourseSchema, 'course');

  // initUserData(Course);
  return Course;
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
        classTags: '',
        author: '陆向谦',
        authorTags: '',
        description: '',
        onlineTime: '',
        addTime: Date.now(),
        updateTime: Date.now(),
        sort: 1,
        category_id: '6362d1e02bbfd16b331657ca',
      }).save();
    } else {
      console.log('-------------创建主课成功--------------');
    }
  });
}
