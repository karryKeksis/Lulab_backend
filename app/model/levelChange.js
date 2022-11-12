/*'use strict';
* */

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const moment = require('moment');
    const LevelChangeSchema = new Schema({
      name: {
        type: String,
        unique: true,
        required: false,
        get: v => v==null ? "" : v,
      },
      level: {
        type: String,
        unique: false,
        required: false,
        get: v => v==null ? "" : v,
      },
    });
    return mongoose.model('LevelChange', LevelChangeSchema);
  }
  