const { Category } = require("../model/categoryModel");
const { Product } = require("../model/productModel");


const categoryController = {
    //create
    create: async (req, res) => {
        const newProduct = new Category(req.body)
        try {
            const savedProduct = await newProduct.save();
            res.status(200).json(savedProduct);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //GET ALL
    getAll: async (req, res) => {
        try {
            const categorys = await Category.find();
            res.status(200).json(categorys);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //get by id
    getByPath: async (req, res) => {
        try {
            const products = Product.find({ "category": Category.findOne({ "path": req.params.path }) })
            res.status(200).json(products)
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

};

module.exports = categoryController;
