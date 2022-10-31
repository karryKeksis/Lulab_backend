'use strict';
const roleValidator = {
  name: { type: 'name', require: true, max: 50, field: '角色名称' },
  remarks: { require: false, type: 'name', max: 100, field: '备注信息' },
};
module.exports = (app) => {
    class RoleController extends app.Controller {
        async role () {
            const data = await this.ctx.service.Role.getRole(id);
            this.success(data);
        }

        async roleList () {
            const data = await this.ctx.service.Role.getRoleList();
            this.success(data);
        }

        async AccessList () {
            const { id } = this.ctx.params;
            const data = await this.ctx.service.Role.getRoleAccessList({'role_id':id});
            this.success(data);
        }
}

module.exports = RoleController;
}