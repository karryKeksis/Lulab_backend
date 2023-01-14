module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const RoleSchema = new Schema({
      // 角色名称
      name: {
        type: String,
        unique: true,
        required: false,
      },
      accessIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'Access'}]
    });
  
    return mongoose.model('Role', RoleSchema);
  }
  