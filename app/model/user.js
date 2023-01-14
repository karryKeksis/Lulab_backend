/*'use strict';
};*/

module.exports = app => {
<<<<<<< HEAD
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserSchema = new Schema({
    username: {
      type: String,
      unique: true,
      required: false,
<<<<<<< HEAD
    }, 
    password: {
      type: String,
=======
    },
    sex: {
      type: String,
      unique: false,
      required: false,
    },
    age: {
      type: String,
      unique: false,
      required: false,
    },
    schoolRecord: {
      type: String,
      unique: false,
      required: false,
    },
    position: {
      type: String,
      unique: false,
      required: false,
    },
    location: {
      type: String,
      unique: false,
      required: false,
    },
    country: {
      type: String,
      unique: false,
      required: false,
    },
    phone: {
      type: String,
      unique: false,
      required: false,
    },
    email: {
      type: String,
      unique: false,
      required: false,
    },
    wechat: {
      type: String,
      unique: false,
      required: false,
    },
    workCondition: {
      type: String,
      unique: false,
      required: false,
    },
    industry: {
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
    detailMsg: {
      type: String,
      unique: false,
      required: false,
    },
    password: {
      type: String,
      unique: false,
      required: false,
    },
    category: {
      type: String,
      unique: false,
      required: false,
    },
    userType: {
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
    videos: [{
      type: String,
      unique: false,
      required: false,
    }],
    imgs: [{
      type: String,
      unique: false,
      required: false,
    }],
    docs: [{
      type: String,
      unique: false,
      required: false,
    }],
    growthDescriptions: [{
      type: String,
      unique: false,
      required: false,
    }],
    tags: [{
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
>>>>>>> d0aa9ef303fa9707a4f760212e94acf03781ef0d
      required: false,
    },
    roleIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'Role'}]
  });

  return mongoose.model('User', UserSchema);
<<<<<<< HEAD
=======
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const UserSchema = new Schema({
        name: {
            type: String,
            unique: true,
            required: false,
            get: v => v==null ? "" : v,
        },
        sex: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v,
        },
        birth: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v,
        },
        schoolRecord: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v,
        },
        position: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v,
        },
        location: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v,
        },
        country: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v,
        },
        phone: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v,
        },
        email: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v,
        },
        wechat: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v,
        },
        workCondition: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v,
        },
        industry: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v,
        },
        description: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v,
        },
        identity: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v
        },
        detailMsg: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v
        },
        duration: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v
        },
        address: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v
        },
        company: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v
        },


        password: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v
        },
        category: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v
        },

        userType: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v
        },

        imgUrl: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v
        },
        iconUrl: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v
        },
        bigCoverUrl: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v
        },
        profileImgUrl: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v
        },
        videoUrl: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v
        },
        homeTown: [{
            type: String,
            unique: false,
            required: false,
        }],
        location:[{
            type:String,
            unique:false,
            required:false,
        }],
        imgs: [{
            type: String,
            unique: false,
            required: false,
        }],
        tags: [{
            type: String,
            unique: false,
            required: false,
        }],
        addTime: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v
        },
        timestamp: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v
        },
    });

    return mongoose.model('User', UserSchema);
>>>>>>> origin
}
=======
}
>>>>>>> d0aa9ef303fa9707a4f760212e94acf03781ef0d
