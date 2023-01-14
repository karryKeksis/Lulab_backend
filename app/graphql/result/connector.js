'use strict';

class UserConnector {

    constructor(ctx, model) {
        this.ctx = ctx;
    }

    async getData(id) {
        console.log("aaaaa = ", id)
        return {
            id
        }
    }
 

    
}

module.exports = UserConnector;
