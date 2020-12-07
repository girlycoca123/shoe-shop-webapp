const upload = require('../services/ImageUpload')
const express = require("express");
const { Product, Cart } = require('../models');
const routes = express.Router();
const underscore = require('underscore');

routes.post("/add", (req, res) => {
    const payload = req.body
    let newCart = new Cart(payload)
    newCart.save((err, newCart) => {
        if (err) return res.status(501).send(err)
        res.send(newCart)
    })
})

routes.post("/order/place", (req, res) => {
    let { customer } = req.body
    try {
        Cart.updateMany({ customer }, { $set: { status: 'Ordered' } }, (err, cart) => {
            if (err) return res.status(501).send(err)
            res.send(cart)
        })
    } catch (error) {
        return res.status(501).send(error)
    }
})

routes.post("/update", (req, res) => {
    let { id, quantity, size, total } = req.body
    Cart.findByIdAndUpdate(id, {
        $set: {
            quantity,
            size,
            total
        }
    }, { new: true }, (err, cart) => {
        if (err) return res.status(501).send(err)
        res.send(cart)
    })
})

routes.post("/delete/:id", (req, res) => {
    let id = req.params.id
    Cart.findByIdAndDelete(id, (err, cart) => {
        if (err) return res.status(501).send(err)
        res.send(cart)
    })
})

routes.get('/dashboard', async(req, res) => {
    console.log("Hello")
    const cart = await Cart.find();

    var products = underscore.countBy(cart, function(result) {
        return result.product;
    })
    console.log(products)
    return res.redirect('/admin/dashboard')
})

routes.get('/dashboard/analytics', async(req, res) => {
    const cart = await Cart.find();
    console.log(cart)
    var products = underscore.countBy(cart, function(result) {
        return result.product;
    })
    console.log(products)

    res.json({
        result: products
    })

})



module.exports = routes;