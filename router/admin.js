const router = require('express').Router()
const { Product, Cart } = require("./../models")


// This is routes for admin
router.get('/dashboard', (req, res) => {
    res.render('admin/adminPages/index', {
        title: "Dashboard",
        layout: 'admin/adminLayout/app'
    });
});

router.get('/product', async(req, res) => {
    var products = await Product.find();
    if (!products) {
        res.status(404).json({
            message: " Error uy"
        })
    }
    res.render('admin/adminPages/product', {
        product: products,
        layout: 'admin/adminLayout/app'
    });
});

app.get("/products", (req, res) => {
    Cart.find({ customer: req.params.user })
        .populate('product')
        .exec(function(err, products) {
            if (err) {
                return res.status(500).json(err)
            }
            return res.render("admin/adminPages/product", {
                title: "Products",
                products,
                layout: 'layouts/app'
            })
        });
})

router.get('/order', (req, res) => {

    Cart.find({ status: "Ordered", product: { $ne: null } })
        .populate('product')
        .populate('customer')
        .exec(function(err, orders) {
            if (err) {
                return res.status(500).json(err)
            }
            console.log(orders);
            orders = orders.filter(order => order.product != null)
            return res.render('admin/adminPages/order', {
                title: "Order",
                layout: 'admin/adminLayout/app',
                orders
            });
        })
});

router.get('/customer', (req, res) => {

    res.render('admin/adminPages/customer', {
        title: "Customer",
        layout: 'admin/adminLayout/app'
    });
});

router.get('/product/adding-new-product', (req, res) => {

    res.render('admin/adminPages/addProduct', {
        title: "Adding Product",
        layout: 'admin/adminLayout/app'
    });
});

router.get('/product/updating-product-details/:id', async(req, res) => {

    const products = await Product.findOne({ _id: req.params.id });
    res.render('admin/adminPages/updateProduct', {
        title: "Updating Product",
        id: products,
        layout: 'admin/adminLayout/app'

    });
});

router.post('/product/updating-product-details', (req, res) => {

    res.render('admin/adminPages/updateProduct', {
        title: "Updating Product",
        layout: 'admin/adminLayout/app'
    });
});

module.exports = router