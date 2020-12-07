const Product = require("../models/Product");

const updateProduct = async(req, res) => {
    let body = req.body
    if (req.file) {
        body.image = req.file.filename
    }
    const result = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    if (!result) {
        return res.status(404).json({
            message: "Error uyy"
        })
    }
    res.redirect('/admin/product');
}

module.exports = { updateProduct }