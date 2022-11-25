'use strict';

// Instantiates a session client

const moment = require('moment');

class ProductInfoConnector /* extends BasicConnector */ {


  async fetch(ids) {
    /* return await this.ctx.model.User.create({
           name:"testone"
         });*/
    console.log('what is the ids' + ids);
    return await this.ctx.model.User.find({
      name: ids,
    });
  }

  fetchByIds(ids) {
    return this.loader.loadMany(ids);
  }

  async fetchById(id) {
    return this.loader.load(id);
  }

  // login
  async fetchByName(userInput) {
    let user = await this.ctx.model.User.findOne(
      { name: userInput.name }, function(err, docs) {
        console.log(docs);
      }
    );

    await Promise.all([ user ]);
    user = await user;
    if (user == null || !user) {
      return { status: 1, msg: '该用户不存在' };
    }

    if (userInput.password === user.password) {
      return { status: 0, msg: 'success', data: user };
    }
    return { status: 1, msg: 'faile' };


  }


  // rigister
  async alipayInfo(productInput) {

    /* var product = await this.ctx.model.ProductInfo.create({
            type:"1",
            poster: "https://qn2.proflu.cn/%E5%A4%B4%E5%83%8F/%E5%A4%B4%E5%83%8F10.png",
            paymentWay: "支付宝支付",
            goodsPrice: "2888.00",
            goodsTime: "1970-01-01 00:00:00",
            goodsName: "会员",
            goodsBody:"购买会员后可观看会员课程",
            goodsId: "61",
            goodsCategory: "app端产品"
        },function(err,docs){});
        await Promise.all([product]);
        product = await product;*/
    /* var result = await this.ctx.model.User.findOne({
            name:"test3"
          },null,function (err, docs) {
                  //console.log("docs.level=" + docs.level);
        });*/
    let result = await this.ctx.model.ProductInfo.findOne(
      { type: productInput.type }
    );
    await Promise.all([ result ]);
    result = await result;
    console.log(result);
    return result;
  }


  // update user
  async userUpdate(userInput) {
    console.log(userInput.wechat + '===' + userInput.phone + '=====' + userInput.sex + '====' + userInput.age + '=====' + userInput.img);
    var user = await this.ctx.model.User.findOne(
      { name: userInput.name }, function(err, docs) {
        // console.log(docs);
        // return {"status": 1, "name": "hehe"}
      }
    );

    await Promise.all([ user ]);
    user = await user;
    if (user && user.name != null && user._id != userInput._id) {
      return { status: 1, msg: '更新失败,已存在一样的用户名' };
    }

    var user = await this.ctx.model.User.findOne(
      { _id: userInput._id }, function(err, docs) {
        // console.log(docs);
        // return {"status": 1, "name": "hehe"}
      }
    );
    await Promise.all([ user ]);
    user = await user;
    // console.log(userInput.sex + "==thetestundefined" + (userInput.sex == undefined) +"======")
    if (userInput.imgUrl != null) {
      user.imgUrl = userInput.imgUrl;
    } if (userInput.sex != null) {
      user.sex = userInput.sex;
    } if (userInput.imgs != null) {
      user.imgs = userInput.imgs;
    } if (userInput.description != null) {
      user.description = userInput.description;
    } if (userInput.wechat != null) {
      user.wechat = userInput.wechat;
    } if (userInput.phone != null) {
      user.phone = userInput.phone;
    } if (userInput.profileImgUrl != null) {
      user.profileImgUrl = userInput.profileImgUrl;
    } if (userInput.email != null) {
      user.email = userInput.email;
    } if (userInput.schoolRecord != null) {
      user.schoolRecord = userInput.schoolRecord;
    } if (userInput.detailMsg != null) {
      user.detailMsg = userInput.detailMsg;
    } if (userInput.workCondition != null) {
      user.workCondition = userInput.workCondition;
    } if (userInput.category != null) {
      user.category = userInput.category;
    } if (userInput.userType != null) {
      user.userType = userInput.userType;
    } if (userInput.birth != null) {
      user.birth = userInput.birth;
    } if (userInput.identity != null) {
      user.identity = userInput.identity;
    } if (userInput.iconUrl != null) {
      user.iconUrl = userInput.iconUrl;
    } if (userInput.bigCoverUrl != null) {
      user.bigCoverUrl = userInput.bigCoverUrl;
    } if (userInput.password != null) {
      user.password = userInput.password;
    } if (userInput.duration != null) {
      user.duration = userInput.duration;
    } if (userInput.address != null) {
      user.address = userInput.address;
    } if (userInput.name != null) {
      user.name = userInput.name;
    } if (userInput.company != null) {
      user.company = userInput.company;
    } if (userInput.location != null) {
      user.location = userInput.location;
    } if (userInput.tags != null) {
      user.tags = userInput.tags;
    } if (userInput.homeTown != null) {
      user.homeTown = userInput.homeTown;
    } if (userInput.videoUrl != null) {
      user.videoUrl = userInput.videoUrl;
    } if (userInput.addTime != null) {
      user.addTime = userInput.addTime;
    } if (userInput.timestamp != null) {
      user.timestamp = userInput.timestamp;
    }


    var user = await this.ctx.model.User.updateMany(
      { _id: userInput._id }, { $set: { imgUrl: user.imgUrl, sex: user.sex, imgs: user.imgs,
        description: user.description, addTime: user.addTime, timestamp: user.timestamp,
        wechat: user.wechat, phone: user.phone, position: user.position, videoUrl: user.videoUrl,
        industry: user.industry, country: user.country, phone: user.phone, profileImgUrl: user.profileImgUrl,
        email: user.email, schoolRecord: user.schoolRecord, detailMsg: user.detailMsg,
        identity: user.identity, iconUrl: user.iconUrl, bigCoverUrl: user.bigCoverUrl, password: user.password, location: user.location,
        duration: user.duration, address: user.address, name: user.name, company: user.company, tags: user.tags, homeTown: user.homeTown },

      }, function(err, docs) {
        console.log(JSON.stringify(docs) + 'err' + '=====' + err);
        return { status: 1, msg: '更新失败' + err };
      }
    );
    await Promise.all([ user ]);
    user = await user;
    return { status: 0, msg: '更新成功' };
  }


  async userRich(id) {
    let user = this.ctx.model[this.model].findOne({
      _id: id,
    }).exec();

    const basicQuery = {
      user: id,
      isDeleted: false,
      isBlocked: false,
    };

    const getCount = (model, query) => {
      return this.ctx.model[model].countDocuments(query).exec();
    };

    let postCount = getCount(MODEL_NAMES.POST, basicQuery);
    let commentCount = getCount(MODEL_NAMES.COMMENT, basicQuery);
    let postCommentCount = getCount(MODEL_NAMES.POST_COMMENT, basicQuery);
    let collectCount = getCount(MODEL_NAMES.COLLECT, {
      actor: id,
      value: true,
    });
    let notificationCount = getCount(MODEL_NAMES.NOTIFICATION, {
      ...basicQuery,
      status: NOTIFICATION_STATUS.INIT,
    });

    await Promise.all([ user, postCount, commentCount, postCommentCount, collectCount, notificationCount ]);

    // 将promise转化成值，mongoose配合promise.all所需的特殊操作
    user = await user;
    postCount = await postCount;
    commentCount = await commentCount;
    postCommentCount = await postCommentCount;
    collectCount = await collectCount;
    notificationCount = await notificationCount;

    if (user) {
      return {
        ...user._doc,
        postCount,
        commentCount,
        postCommentCount,
        collectCount,
        notificationCount,
      };
    }
  }

  async userLogin(userLoginPayload) {
    const clientType = await this.ctx.service.util.getClientType();
    switch (clientType) {
      case CLIENTS.GUGU_WECHAT_MINI:
        return await this.userWechatMiniLogin(clientType, userLoginPayload);

      default:
        return;
    }
  }

  async latestClassificationUser(category, option) {
    return await this.ctx.model.User.find({ category }, null, { limit: option.limit, skip: option.skip }, function(err, docs) {
      // console.log(docs +"cassuser ");
    });
  }

  async userWechatMiniLogin(clientType, userLoginPayload) {

    try {

      const {
        jscode,
        grantType,
      } = userLoginPayload;

      let result = await this.ctx.service.wechat.jsCode2Session(jscode, grantType);

      if (!result) return;
      result = JSON.parse(result);
      const sessionKey = result.session_key;
      const openId = result.openid;
      // const unionId = result['unionid'];
      if (!sessionKey || !openId) return;

      const user = await this.ctx.model[this.model].findOneAndUpdate({
        credential: {
          $elemMatch: {
            clientType,
            openId,
          },
        },
      }, {
        loginedAt: Date.now(),
        credential: {
          sessionKey,
          clientType,
          openId,
        },
        // unionId
      }, {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      });

      const accessToken = await this.ctx.service.token.signJwt({
        openId,
        sessionKey,
        clientType,
      });

      this.ctx.cookies.set('accessToken', accessToken, {
        signed: false,
        encrypt: true,
      });

      return user;
    } catch (e) {
      console.error(e);
      this.ctx.response.body = {
        error: 'Fail to login WeChat mini program user: ' + e,
        code: errorCode.USER_FAILED_TO_USER_WECHAT_MINI_LOGIN,
      };
    }
  }

  async onboardSelf(id, input) {
    const result = await this.ctx.model[this.model].findByIdAndUpdate({
      _id: id,
    }, {
      ...input,
      onboardingStatus: ONBOARDING_STATUS.ONBOARDED,
      loginedAt: Date.now(),
      updatedAt: Date.now(),
    }, {
      upsert: false,
      new: true,
      setDefaultsOnInsert: true,
    });
    return result;
  }

  // async userByToken(token) {
  //   const user = await this.ctx.model[this.model].find(
  //     {
  //       isDeleted: false,
  //       isBlocked: false,
  //       token,
  //     },
  //   );
  //   if (!user) throw new Error("User not found")
  //   return user
  // }

  async sendEmailCode(userInput) {
    const {
      ctx,
    } = this;
    const tempEmail = userInput.email; // TODO: 前端传递的email应当也为salt加密过的
    const email = ctx.service.secret.reversibleEncrypt(tempEmail, true);
    // TODO: 这里是不是可以用findByIdAndUpdate, upsert true，直接就插入了？
    let user = await ctx.service.user.userByEmail(email);
    if (user) {
      if (user.onboardingStatus === ONBOARDING_STATUS.ONBOARDED) {
        return null;
      }
    } else {
      user = await ctx.model.User.create({
        email,
        onboardingStatus: ONBOARDING_STATUS.DEFAULT,
      });
    }
    //  var token = sign(user._id.toString(),'wsd',{expiresIn: 24 * 60 * 60  /* 1 days */});
    // TODO: 以后这行逻辑可以放进service里
    const activeKey = Array.from(Array(6), () => parseInt((Math.random() * 10))).join('');
    // TODO: 这里需要await确认发送成功，如果没有法功成功也要返回状态给前端
    ctx.service.user.sendEmail(activeKey, tempEmail);
    const result = await ctx.model.User.findByIdAndUpdate(
      user._id, {
        emailVerificationCode: activeKey,
        emailVerificationCodeExpiredAt: moment().add(15, 'minutes').toDate(), // TODO: 这里不用存可读的时间戳，用Date.now() + 600就行，表示600秒之后
      }, {
        new: true,
      }
    );
    return result;
  }

  async verifyEmailCode(userInput) {
    const {
      ctx,
    } = this;
    // TODO: 这些以后都应当是加密的
    let {
      email,
      emailVerificationCode,
    } = userInput;
    email = ctx.service.secret.reversibleEncrypt(email, true);
    const user = await ctx.service.user.userByEmail(email);
    if (!user) return null; // 这里返回前端的消息还是不太一样的，比如用户不存在、已注册等等，null可能不能够表示清楚
    if (user.onboardingStatus === ONBOARDING_STATUS.ONBOARDED) return null;
    if (emailVerificationCode !== user.emailVerificationCode) return null;
    if (moment().toDate() > user.emailVerificationCodeExpiredAt) return null; // TODO: 根据上面的修改所存的时间戳，这里直接跟data.now()比大小就行
    const result = await ctx.model.User.findByIdAndUpdate(
      user._id, {
        onboardingStatus: ONBOARDING_STATUS.EMAIL_VERIFIED,
        updatedAt: Date.now(),
      }, {
        new: true,
      }
    );
    return result;
  }

  async onboardSelfByEmail(userInput) {
    const {
      ctx,
    } = this;
    // TODO: 这些以后都应当是加密的
    let {
      email,
      password,
    } = userInput;
    // salt加密email
    // 加密email
    email = ctx.service.secret.reversibleEncrypt(email, true);
    // 这里不应该是按email查，而是应该按前面注册后储存的东西来查，但我不知咋写
    const user = await ctx.service.user.userByEmail(email);
    if (user.onboardingStatus !== ONBOARDING_STATUS.EMAIL_VERIFIED) return null;

    // TODO: 这个salt需要存进数据库吗？salt1和salt2每次生成的结果如果都一样那就没必要存进数据库，还是说它这个随时间或随机变化吗？
    // 如果这样，是不是generateSalt应该直接合并进saltHash?
    const [ salt1, salt2 ] = ctx.service.secret.generateSalt(11, 23);
    password = ctx.service.secret.saltHash(password, salt1, salt2);
    const result = await ctx.model.User.findByIdAndUpdate(
      user._id, {
        onboardingStatus: ONBOARDING_STATUS.ONBOARDED,
        password,
        updatedAt: Date.now(),
        salt1,
        salt2,
      }, {
        new: true,
      }
    );
    return result;
  }

  async userLoginByEmail(userInput) {
    const {
      ctx,
    } = this;
    // TODO: 此处前端传来的密码和邮箱都应当是salt加密过的
    let {
      email,
      password,
    } = userInput;
    // salt加密email
    email = ctx.service.secret.reversibleEncrypt(email, true);
    // 通过解码的email在数据库中查找用户
    const user = await ctx.service.user.userByEmail(email);
    if (!user) return null;
    // 如果用户尚未注册过
    if (user.onboardingStatus != ONBOARDING_STATUS.ONBOARDED) return null;
    const passwordSalt = ctx.service.secret.saltHash(password, user.salt1, user.salt2);
    if (!ctx.service.secret.safeEqualForString(user.password, passwordSalt)) return null; // TODO 需要加密后再比较
    const result = await this.ctx.model[this.model].findByIdAndUpdate({
      _id: user.id,
    }, {
      loginedAt: Date.now(),
    }, {
      upsert: false,
      new: true,
      setDefaultsOnInsert: true,
    });
    return result;
  }
}

module.exports = ProductInfoConnector;
