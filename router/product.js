const upload = require('../services/ImageUpload')
const express = require("express");
const { Product } = require('../models');
const router = express.Router();
const productList = require("../controller/productController");

router.route("/add").post(upload.single('image'), (req, res) => {
    let image = '';
    if (req.file) {
        image = req.file.filename
    }
let details = JSON.parse(req.body.details);
details.image = image;

let product = new Product(details);
    product.save((err, product)=>{
        if (err) {
            res.status(500).send({error: err})
        }
         res.send({message:'new product' ,  product })
    })
});

router.get("/admin/product", productList.getProducts);
// router.post("/add", productList.addProducts);
router.post("/update/", productList.updateProductById);
router.get("/delete/:id", productList.deleteProductById);

module.exports = router;