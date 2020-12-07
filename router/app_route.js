const router = require('express').Router()
const { Product, Cart } = require('../models');
const { getOrder } = require('./../controller/serverSide')
const upload = require('./../services/ImageUpload')
router.get("/auth/login", function(req, res) {

    res.render('auth/login', {
        title: "Sign In",
        layout: false
    })
})

router.get('/:page?', async(req, res) => {

    let data = [];
    let perPage = 8;
    var page = req.params.page || 1
    let count = 0;
    try {
        data = await Product.find({})
            .find({})
            .skip((perPage * page) - perPage)
            .limit(perPage)
        count = await Product.countDocuments()


    } catch (error) {
        data = []
    }
    return res.render('pages/homepage', {
        title: "Shoe Shop",
        current: page,
        pages: Math.ceil(count / perPage),
        data: JSON.stringify(data),
        layout: 'layouts/app'
    })
})

router.get("/auth/registration", function(req, res) {

    res.render('auth/registration', {
        title: "Sign Up",
        layout: false
    })
})

router.get("/user/order/:id", getOrder)

router.get("/api/orders/view/:user", (req, res) => {
    Cart.find({ customer: req.params.user })
        .populate('product')
        .exec(function(err, results) {
            if (err) {
                return res.status(500).json(err)
            }

            results = results.filter(result => {
                if (result.product) {
                    if (!result.product.image) {
                        result.product.image = "placeholder.png"
                    }
                    return true
                } else {
                    return false
                }
            })
            return res.render("pages/cart", {
                title: "View Cart",
                results,
                layout: 'layouts/app'
            })
        });
})

//post product from admin
router.post('/addproduct', upload.single('image'), (req, res) => {
    let payload = req.body
    if (req.file) {
        payload.image = req.file.filename
    }
    console.log(payload);
    Product.create(payload, function(err, result) {
        if (err) {
            // console.log(err)
        }
        res.redirect("/admin/product");
    })
})

module.exports = router