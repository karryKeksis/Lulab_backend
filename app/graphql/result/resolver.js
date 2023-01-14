'use strict';

module.exports = {
    Query: {
        async voice(root, {
            
        }, ctx) {
            // console.log("ctx.connector = ", ctx.connector.ttt)
            let res = await ctx.auth('听声音');
            console.log("res1 = ", res)
            if(res.code == -1){
                return res;
            }
            return {
                msg: '听声音',
                code: 200
            };
        },

        async movice(root, {
            
        }, ctx) {
            // console.log("ctx.connector = ", ctx.connector.ttt)
            let res = await ctx.auth('看电影');
            console.log("res1 = ", res)
            if(res.code == -1){
                return res;
            }
            return {
                msg: '看电影',
                code: 200
            };
        },

    },
};