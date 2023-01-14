module.exports = {
    async auth(curAction) {
        let ctx = this;
        // 进行token校验
        // 获取token
        const token = ctx.request.header.authorization;
        // 不存在token，报400错误
        if (!token) {
            return {
                code: -1,
                msg: '该用户没有访问权限'
            };
        } else {
            // 从token中获取用户信息
            let retoken = await ctx.service.jwt.reToken(token);
            // 校验token,如果无法通过，则拒绝访问
            let chekToken = await ctx.service.jwt.verifyToken(retoken);
            if (chekToken) {
                let res = await ctx.service.jwt.getUserIdFromToken(retoken);
                const currentAuth = [];
                res.roleIds.forEach((v) => {
                    v.accessIds.forEach((item) => {
                        currentAuth.push(item);
                    })
                })
                // 与远程调用对比
                let hasAuth = false;
                console.log("currentAuth = ", currentAuth)
                currentAuth.forEach((v) => {
                    if (v.name == curAction) {
                        hasAuth = true;
                    }
                })
                if (hasAuth) {
                    // 有权限放行
                    return {
                        code: 200
                    };
                } else {
                    // 无权限进行拦截
                    return {
                        code: -1,
                        msg: '该用户没有访问权限'
                    };
                }
            } else {
                return {
                    code: -1,
                    msg: '无效的token'
                };
            }
        }

    },
}