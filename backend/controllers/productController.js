const { Category } = require("../model/categoryModel");
const { Product } = require("../model/productModel");

const productController = {
    //create
    create: async (req, res) => {
        const newProduct = new Product(req.body)
        try {
            const savedProduct = await newProduct.save();
            res.status(200).json({
                status: true,
                data: savedProduct
            });
        } catch (err) {
            res.status(200).json({
                status: false,
                data: err
            });
        }
    },
    //GET ALL
    getAll: async (req, res) => {
        try {
            const products = await Product.find();
            res.status(200).json(products);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //get by id
    getById: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            res.status(200).json(product);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getByCategory: async (req, res) => {
        try {
            const c = await Category.findOne({ "path": req.params.category })
            try {
                const products = await Product.find({ "category": c.name })
                res.status(200).json(products)
            }
            catch (err) {
                res.status(500).json(err);
            }
        }
        catch (err) {
            res.status(500).json(err);
        }

    },

    getOffsetNew: async (req, res) => {
        try {
            const products = await Product.find({}).limit(10);
            res.status(200).json(products);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //UPDATE
    updateProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            await product.updateOne({ $set: req.body });
            res.status(200).json({
                status: true,
                data: product
            });
        } catch (err) {
            res.status(200).json({
                status: false,
                data: err
            });
        }
    },

    //DELETE Product
    deleteProduct: async (req, res) => {
        try {
            await Product.findByIdAndDelete(req.params.id);
            res.status(200).json({
                status: true,
            });
        } catch (err) {
            res.status(200).json({
                status: false,
            });
        }
    },

    //Search By Name
    searchByName: async (req, res) => {
        try {
            if (!req.params.name) {
                res.status(404).json("Không có kết quả");
            }
            const products = await Product.find({ "name": { $regex: req.params.name, $options: "i" } });
            res.status(200).json(products);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    updateStatus: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            await product.updateOne({ $set: { status: !product.status } });
            res.status(200).json({
                status: true,
                data: !product.status
            });
        } catch (err) {
            res.status(200).json({
                status: false,
                data: err
            });
        }
    }
};

module.exports = productController;
