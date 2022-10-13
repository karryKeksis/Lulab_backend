'use strict';
const Service = require('egg').Service;
const moment = require('moment');
class UserService extends Service {
    // 获取单条用户信息
    async show(data) {
        const { app } = this;
        const prefix = app.config.mongodbConfig.prefix;
        const res = await app.mongodb.get(`${prefix}user`, data);
        return res;
    }

    async index(columns, where) {
        const { app } = this;
        const prefix = app.config.mongodbConfig.prefix;
        const res = await app.mongodb.select(`${prefix}user`, {
            columns,
            orders: [['id', 'desc']],
            where,
        });
        return res;
    }
    // 获取列表
    async list(query) {
        const { app: { mongodb, config } } = this;
        const { escape } = mongodb;
        const prefix = config.mongodbConfig.prefix;
        const { current, page_size, username, name, status } = query;
        const offset = current * page_size - page_size;
        let whereDb = '';
        const columns = 'id, username, name, phone, status, created_at';
        let listDb = `select ${columns} from ${prefix}user where is_delete=0 and is_super=0 `;
        let countDb = `select count(*) as count from ${prefix}user where is_delete=0 and is_super=0 `;
        username && (whereDb += `and username like ${escape(`%${username}%`)} `);
        name && (whereDb += `and name like ${escape(`%${name}%`)} `);
        status && (whereDb += `and status=${escape(status)} `);
        whereDb && (countDb += whereDb);
        whereDb && (listDb += whereDb);
        listDb += `order by id desc limit ${escape(+offset)}, ${escape(+page_size)}`;
        const listRes = await mongodb.query(listDb);
        const totalRes = await mongodb.query(countDb);
        const data = {
            list: listRes,
            total: totalRes[0].count,
        };
        return data;
    }

    // 导出查询列表
    async exportList(columns, query) {
        const { app: { mongodb, config } } = this;
        const { escape } = mongodb;
        const prefix = config.mongodbConfig.prefix;
        const { username, name, status } = query;
        let whereDb = '';
        let listDb = `select ${columns} from ${prefix}user where is_delete=0 and is_super=0 `;
        username && (whereDb += `and username like ${escape(`%${username}%`)} `);
        name && (whereDb += `and name like ${escape(`%${name}%`)} `);
        status && (whereDb += `and status=${escape(status)} `);
        whereDb && (listDb += whereDb);
        listDb += 'order by id desc';
        const data = await mongodb.query(listDb);
        return data;
    }

    // 添加
    async create({ roles, ...rest }) {
        const { app: { mongodb, config }, ctx } = this;
        const { helper } = ctx;
        const prefix = config.mongodbConfig.prefix;
        rest.created_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        const password = helper.addSaltPassword(config.initPassword);

        // 创建用户的时候，插入用户角色关联关系
        const res = await mongodb.beginTransactionScope(async conn => {
            console.log(rest, 'rest');
            const userRes = await conn.insert(`${prefix}user`, {
                ...rest,
                password,
            });
            const userRoleData = roles.map(val => ({
                user_id: userRes.insertId,
                role_id: val,
                created_at: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            }));
            await conn.insert(`${prefix}user_role`, userRoleData);
            return true;
        }, ctx);
        return res;
    }

    // 修改
    async update({ roles, ...rest }, options) {
        const { app: { mongodb, config }, ctx } = this;
        const prefix = config.mongodbConfig.prefix;
        rest.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        const userRoleData = roles && roles.map(val => ({
            user_id: options.where.id,
            role_id: val,
            created_at: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        }));
        // 修改用户的时候，重新绑定用户角色关联关系
        const res = await mongodb.beginTransactionScope(async conn => {
            // 添加基本信息
            await conn.update(`${prefix}user`, rest, options);
            // 删除的时候不修改roles
            if (roles) {
                // 删除角色关联关系
                await conn.delete(`${prefix}user_role`, {
                    user_id: options.where.id,
                });
                // 重新添加角色关联关系
                await conn.insert(`${prefix}user_role`, userRoleData);
            }
            return true;
        }, ctx);
        return res;
    }
    // 删除
    // async delete(data) {
    //     const { app } = this;
    //     const prefix = app.config.mongodbConfig.prefix;
    //     const res = await this.app.mongodb.delete(`${prefix}user`, data);
    //     return res.affectedRows === 1;
    // }
}
module.exports = UserService;