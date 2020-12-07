const { Schema, model } = require('mongoose');

const CartSchema = new Schema({
    customer: { type: Schema.ObjectId, ref: 'Profile' },
    product: { type: Schema.ObjectId, ref: 'Product' },
    size: { type: String, required: true },
    color: { type: String, required: true },
    quantity: { type: Number, required: true },
    total: { type: Number, required: true },
    dateOrdered: { type: Date, default: new Date() },
    status: { type: String, default: 'Pending' },
    delivered: { type: Boolean, default: false }
})

const Cart = model("Cart", CartSchema);
module.exports = Cart;