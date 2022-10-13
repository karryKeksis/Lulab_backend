'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post("/upload", controller.utils.uploadFiles);
  /*角色管理*/
  /*
  app.router.get(app.adminName()+'/role',app.controller.admin.role.index);
  app.router.get(app.adminName()+'/role/add',app.controller.admin.role.add);
  app.router.post(app.adminName()+'/role/doadd',app.controller.admin.role.doAdd);
  app.router.get(app.adminName()+'/role/edit',app.controller.admin.role.edit);
  app.router.post(app.adminName()+'/role/doedit',app.controller.admin.role.doEdit);
  app.router.get(app.adminName()+'/role/auth',app.controller.admin.role.auth);
  app.router.post(app.adminName()+'/role/doauth',app.controller.admin.role.doAuth);
  app.router.get(app.adminName()+'/role/delete',app.controller.admin.role.delete);
  app.router.get(app.adminName()+'/role/change',app.controller.admin.role.change);
  /*权限管理*/

  /*
  app.router.get(app.adminName()+'/access',app.controller.admin.access.index);
  app.router.get(app.adminName()+'/access/add',app.controller.admin.access.add);
  app.router.post(app.adminName()+'/access/doadd',app.controller.admin.access.doAdd);
  app.router.get(app.adminName()+'/access/edit',app.controller.admin.access.edit);
  app.router.post(app.adminName()+'/access/doedit',app.controller.admin.access.doEdit);
  app.router.get(app.adminName()+'/access/delete',app.controller.admin.access.delete);
  app.router.get(app.adminName()+'/access/change',app.controller.admin.access.change);
  */
};
