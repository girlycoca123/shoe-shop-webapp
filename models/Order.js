const { Schema, model } = require('mongoose');

const OrderSchema = new Schema({
    customer: { type: Schema.ObjectId, ref: 'Profile' },
    orderItem: { type: Schema.ObjectId, ref: 'Cart' },
    dateOrdered: { type: Date, default: new Date() },
})

const Order = model("Order", OrderSchema);
module.exports = Order;