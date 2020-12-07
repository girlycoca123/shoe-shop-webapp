const Product = require("../models/Product");

module.exports = {

    getProducts: async(request, response) => {

        try {
            const products = await Product.find();
            if (!products) {
                return response.status(400).json({
                    error: "Error in getting tasks!",
                });
            }
                response.render('admin/adminPages/product',
                {
                    layout: 'admin/adminLayout/app',
                    title: "Products",
                    productList: products
                }
                );
        } catch (e) {
            return response.status(400).json({
                error: e,
            });
        }
        response.redirect('admin/adminPages/product')

    },

    updateProductById: async(request, response) => {


        try {
            const result = await Task.updateOne({ _id: request.body.id }, { $set: {task: request.body.title} });

            if (!result) {
                return response.status(400).json({
                    error: "Error in updating task!",
                });
            }

            response.status(200).json({
                result: result,
            });

        } catch (e) {
            return response.status(400).json({
                error: e,
            });
        }

    },

    deleteProductById: async(request, response) => {

        try {
            await Task.deleteOne({ _id: request.params.id }, (error, result) => {
                if (error) {
                    return response.status(400).json({
                        error: error,
                    });
                }

               response.redirect("/");
            });
        } catch (e) {
            return response.status(400).json({
                error: e,
            });
        }
    }
};