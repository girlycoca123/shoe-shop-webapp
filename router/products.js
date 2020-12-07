const { Product } = require('./../models');
const { updateProduct } = require('./../controller/addProductAdmin')
const upload = require('./../services/ImageUpload')
const router = require('express').Router()

//Remove products from admin 
router.post('/:id/remove', (req, res) => {
    Product.findByIdAndRemove({ _id: req.params.id }, (err, result) => {
        if (err) {
            // console.log(err);
        }
        res.redirect('/admin/product')
    })
})

router.post('/:id/update', upload.single('image'), updateProduct)
module.exports = router