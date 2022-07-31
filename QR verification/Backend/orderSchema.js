const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Order = new Schema({
    order_id:String,
    email: String,
    hash: {
        type:String,
    },

})


module.exports = mongoose.model('Order', Order);