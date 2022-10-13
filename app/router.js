'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post("/upload", controller.utils.uploadFiles);
  /*角色管理*/
  
  router.get(app.adminName()+'/role',controller.role.index);
  router.get(app.adminName()+'/role/add',controller.role.add);
  router.post(app.adminName()+'/role/doadd',controller.role.doAdd);
  router.get(app.adminName()+'/role/edit',controller.role.edit);
  router.post(app.adminName()+'/role/doedit',controller.role.doEdit);
  router.get(app.adminName()+'/role/auth',controller.role.auth);
  router.post(app.adminName()+'/role/doauth',controller.role.doAuth);
  router.get(app.adminName()+'/role/delete',controller.role.delete);
  router.get(app.adminName()+'/role/change',controller.role.change);
  /*权限管理*/

  
  router.get(app.adminName()+'/access',controller.access.index);
  router.get(app.adminName()+'/access/add',controller.access.add);
  router.post(app.adminName()+'/access/doadd',controller.access.doAdd);
  router.get(app.adminName()+'/access/edit',controller.access.edit);
  router.post(app.adminName()+'/access/doedit',controller.access.doEdit);
  router.get(app.adminName()+'/access/delete',controller.access.delete);
  router.get(app.adminName()+'/access/change',controller.access.change);
  
};
