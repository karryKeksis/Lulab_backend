module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    var d=new Date();
   
    const UserRoleSchema = new Schema({
      role_id:{ type:Schema.Types.ObjectId },
      user_id: { type:Schema.Types.ObjectId }
    });

   
    return mongoose.model('UserRole', UserRoleSchema,'user_role');
}