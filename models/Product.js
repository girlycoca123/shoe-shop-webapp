const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    image: { type: String, default: "" },
    name: { type: String, default: "placeholder.png" },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    brand: { type: String, required: true },
    color: { type: [String], required: true },
    size: { type: [String], required: true },
    description: { type: String },
})

const Product = model("Product", ProductSchema);
module.exports = Product;