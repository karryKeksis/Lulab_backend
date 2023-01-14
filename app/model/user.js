/*'use strict';
};*/

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserSchema = new Schema({
    username: {
      type: String,
      unique: true,
      required: false,
    }, 
    password: {
      type: String,
      required: false,
    },
    roleIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'Role'}]
  });

  return mongoose.model('User', UserSchema);
}
