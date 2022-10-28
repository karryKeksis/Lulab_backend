'use strict';

const Service = require('egg').Service;

class RoleService extends Service {
    async getRoleList() {
        let res = await this.ctx.model.Role.find({});
        return res;
    }
    async getRole(id) {
        try {
            let res = await this.ctx.model.Role.findOne({'_id':id});
            return res;
        } catch (error) {
            return null
        }
    }
    async getRoleAccessList(id){
        try {
            let res = await this.ctx.model.RoleAccess.find({'role_id':id})
            return res;
        } catch (error) {
            return null
        }
    }
}

module.exports = RoleService;