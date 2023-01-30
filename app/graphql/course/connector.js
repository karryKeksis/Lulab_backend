'use strict';

const DataLoader = require('dataloader');
const { cors } = require('../../../config/plugin');
const ObjectId = require('mongodb').ObjectID;

class LaunchConnector {
    constructor(ctx) {
        this.ctx = ctx;
    }

<<<<<<< HEAD
  async fetch(ids) {
    return await this.ctx.model.User.find(
      null,
      null,
      { limit: 4 },
      function(err, docs) {
        // console.log(docs);
      }
    );
  }
=======
    /**
     * courseCategory接口
     * @returns 理论课程，大咖会谈...
     */
    async category() {
        const { ctx, app } = this;
        const cors = await ctx.model.CourseCategory.find({}, { title: 1 }).sort({ sort: 1 });
        return cors;
    }
>>>>>>> b8101ac6c72b76a045c94d1be186d91764542866

    /**
     * 返回课程列表
     * @param {String} category_id 课程分类编号
     * @param {Int} page 请求页数
     * @param {Int} limit 每页请求个数
     * @return {} 返回课程数据
     */
    async course(category_id, page = 1, limit = 100) {
        const { ctx, app } = this;
        const skip = (page - 1) * limit;
        const cors = await ctx.model.Course.aggregate(
            [
                {
                    $match: {
                        category_id: ObjectId(category_id),
                    },
                },
                {
                    $sort: { sort: 1 }
                },
                {
                    $skip: skip
                },
                {
                    $limit: limit
                },
            ],
            (err, docs) => {
                if (err) {
                    console.log('查询错误');
                } else {
                    console.log(JSON.stringify(docs));
                }
            }
        );

        return cors;
    }

    /**
     * 大课（eg.俞敏洪系列课程）的详细资料
     * @param {String} course_id
     * @returns 
     */
    async courseDetail(course_id) {
        const { ctx, app } = this;

<<<<<<< HEAD
  /**
     * 返回课程列表
     * @param {String} category_id 课程分类编号
     * @param {Int} page 请求页数
     * @param {Int} limit 每页请求个数
     * @return {} 返回课程数据
     */
  async course(category_id, page, limit) {
    const { ctx, app } = this;
=======
        const cors = await ctx.model.Course.find(
            { _id: ObjectId(course_id) },
            (err, docs) => {
                if (err) {
                    console.log('查询错误');
                } else {
                    console.log(JSON.stringify(docs));
                }
            }
        );
>>>>>>> b8101ac6c72b76a045c94d1be186d91764542866

        return cors;
    }

    /**
     * 大课下的小课目录
     * @param {String} course_id 
     * @returns 
     */
    async courseCatalogue(course_id) {
        const catalogue = await this.ctx.model.CourseDetail.find(
            { course_id: ObjectId(course_id) },
            { title: 1, duration: 1, free: 1 },
            (err, docs) => {
                if (err) {
                    console.log('查询错误')
                } else {
                    console.log(JSON.stringify(docs))
                }
            }).sort({ sort: 1 })

        return catalogue;
    }

<<<<<<< HEAD
  async courseDetail(course_id) {
    const { ctx, app } = this;

    const cors = await ctx.model.Course.find(
      { _id: ObjectId(course_id) },
      (err, docs) => {
        if (err) {
          console.log('查询错误');
        } else {
          console.log(JSON.stringify(docs));
        }
      }
    ).sort({ sort: 1 });

    return cors;
  }

  async courseLink(detail_id) {
    const { ctx, app } = this;

    const cors = await ctx.model.CourseDetail.find(
      { _id: detail_id },
      { link: 1, _id: 0 },
      (err, docs) => {
        if (err) {
          console.log('查询错误');
        } else {
          // console.log(JSON.stringify(docs));
        }
      }
    );
    const getcode = await ctx.service.qiniu.qiniuDown(cors[0].link, 10);
    // console.log(cors.toString());
    return { link: getcode };
  }
=======
    /**
     * 从七牛云查询小课的播放链接
     * @param {String} detail_id 小课id 
     * @returns 
     */
    async courseLink(detail_id) {
        const { ctx, app } = this;

        const cors = await ctx.model.CourseDetail.find(
            { _id: detail_id },
            { title: 1 },
            (err, docs) => {
                if (err) {
                    console.log('查询错误');
                } else {
                    console.log(JSON.stringify(docs));
                }
            }
        );
        const getcode = await ctx.service.qiniu.qiniuDown(cors[0].title, 3600);
        return { link: getcode, state: '待解决' };
    }
>>>>>>> b8101ac6c72b76a045c94d1be186d91764542866
}

module.exports = LaunchConnector;
