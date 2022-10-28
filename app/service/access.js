'use strict';

const Service = require('egg').Service;

class AccessService extends Service {
    async getAccessList() {
        let res = await this.ctx.model.Access.find({});
        return res;
    }
    async getAccess(id) {
        try {
            let res = await this.ctx.model.Access.findOne({'_id':id});
            return res;
        } catch (error) {
            return null
        }
    }
}

module.exports = AccessService;