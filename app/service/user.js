'use strict';

const Service = require('egg').Service;

class UserService extends Service {
    async getUserList() {
        let res = await this.ctx.model.User.find({});
        return res;
    }
    async getUser(id) {
        try {
            let res = await this.ctx.model.User.findOne({'_id':id});
            return res;
        } catch (error) {
            return null
        }
    }
    async getUserRoleList(id){
        try {
            let res = await this.ctx.model.UserRole.find({'user_id':id})
            return res;
        } catch (error) {
            return null
        }
    }
}

module.exports = UserService;