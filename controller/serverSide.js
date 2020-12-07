const { Product } = require("../models")
const getOrder = async function(req, res) {
    global.app.set('layout', 'layouts/app')
    let id = req.params.id
    if (!id) {
        res.redirect("/")
    }
    try {
        Product.findById(id, (err, product) => {
            if (err) {
                return res.redirect("/")
            }
            console.log(product);

            res.render('pages/order', {
                title: "Add to Cart",
                product,
                image: JSON.parse(JSON.stringify(product)).image
            })
        })
    } catch (error) {
        return res.redirect("/")
    }
}
module.exports = {
    getOrder,
}