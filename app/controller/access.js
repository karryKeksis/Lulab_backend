'use strict';

const BaseController = require('./base');

const accessValidator = {
  title: { require: true, type: 'name', max: 50, field: '权限名称' },
  type: { require: true, type: 'posint', field: '权限类型' },
  api_route_name: { require: false, type: 'name', max: 50, field: '接口路由' },
  sort: { require: true, type: 'posint', field: '排序' },
};

class AccessController extends BaseController {

  async accessList () {
    const data = await this.ctx.service.aceess.getAccessList();
    this.success(data);
  }

  async readAccess () {
    const { id } = this.ctx.params;
    const data = await this.service.access.getAccess(id);
    this.success(data);
  }

}

module.exports = AccessController;