'use strict';

class LaunchConnector {
    constructor(ctx) {
        this.ctx = ctx;
    }

    /**
     * 发送验证码
     * @param {String} mobile 
     * @param {Int} area 
     * @returns 验证码发送状态RES -> {status, message}
     */
    async verifySend(mobile, area) {
        return await this.ctx.service.sms.verifySend(mobile, area);
    }
}

module.exports = LaunchConnector;
