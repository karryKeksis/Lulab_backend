/*'use strict';
};*/

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const AlipaySdkSchema = new Schema({
        outTradeNo: {
            type: String,
            unique: true,
            required: false,
            get: v => v==null ? "" : v,
        },
        productCode: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v,
        },
        totalAmount: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v,
        },
        subject: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v,
        },
        body: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v,
        },
    });

    return mongoose.model('AlipaySdk', AlipaySdkSchema);
}
