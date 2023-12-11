const { Category } = require("../model/categoryModel");
const { Product } = require("../model/productModel");
const fs = require('fs');
const { Order } = require('../model/orderModel')

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
            const product = await Product.findById(req.params.id).populate('review');
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
            await Product.findOneAndUpdate({ "_id": req.params.id }, { "isDelete": true });
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
    },

    updateDiscount: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            await product.updateOne({ $set: { "price": req.body.price, "discount": req.body.discount } });
            res.status(200).json({
                status: true,
            });
        } catch (err) {
            res.status(200).json({
                status: false,
                data: err
            });
        }
    },

    generateSlug: (name) => {
        // const slug = name.toLowerCase().replace(/ /g, '-');
        // const specialChars = "[^0-9a-zA-Z\\p{M}]+";
        // const normalizedSlug = slug.normalize("NFD").replace(new RegExp(specialChars, "g"), "");
        // return normalizedSlug;

        const slug = name.toLowerCase();
        // const specialChars = "[^0-9a-zA-Z\\p{M}]";
        // const normalizedSlug = slug.normalize("NFD").replace(new RegExp(specialChars, "g"), "");
        // return normalizedSlug.replace(/ /g, "-");
        const specialChars = "[^0-9a-zA-Z\\p{M}]";
        const normalizedSlug = slug.normalize("NFD").replace(new RegExp(specialChars, "g"), "");
        return normalizedSlug.replace(/ /g, "-");

        // text = text.replace(/[^a-zA-Z0-9]+/g, '-');
        // text = text.toLowerCase();
        // text = text.replace('--', '-');
        // text = text.trim('-');
        // return text;

    },

    insertManyFromJSON: async (req, res) => {
        try {
            const filePath = req.file.path;

            //console.log(filePath);

            const fileContent = fs.readFileSync(filePath, 'utf-8');

            const products = JSON.parse(fileContent);


            const productsWithSlug = products.map((product) => {
                product.slug = productController.generateSlug(product.name);
                return product;
            });

            const data = await Product.insertMany(productsWithSlug);

            console.log("check data", data);

            res.status(200).json({ success: true, data: data });
        } catch (error) {
            console.error('Lỗi khi insertMany:', error);
            res.status(500).json({ error: 'Lỗi khi insertMany.' });
        }
    },

    searchBySlug: async (req, res) => {
        try {
            const product = await Product.findOne({ slug: req.params.slug });
            console.log(product);
            if (!product) {
                return res.status(200).json({ success: false, message: 'Product not found.' });
            }
            res.status(200).json({ success: true, data: product });
        } catch (error) {
            res.status(500).json({ message: 'Server error.' });
        }
    },

    findById: async (id) => {
        const product = await Product.findOne({ _id: id })
        return product;
    },
    // statisticSaleByProduct: async (req, res) => {
    //     try {
    //         const orders = await Order.find({ status: 1 }).populate('cart.items.product');

    //         const arr = [];

    //         const revenueByProduct = {
    //             "name": "",
    //             "revenue": 0,
    //             "id": "",
    //             "quantity": 0
    //         };

    //         orders.forEach((order) => {
    //             order.cart.items.forEach(async (item) => {
    //                 const productId = item.productId;
    //                 console.log(productId);
    //                 const pro = await productController.findById(productId);
    //                 console.log(pro);
    //                 const quantity = item.quantity;
    //                 const sellingPrice = pro.price;
    //                 console.log(sellingPrice);
    //                 const revenue = quantity * sellingPrice;
    //                 console.log(revenue);
    //                 if (revenueByProduct) {
    //                     revenueByProduct.revenue += revenue;
    //                     revenueByProduct.quantity += quantity;
    //                     revenueByProduct.name = pro.name;
    //                     revenueByProduct.id = pro._id;
    //                     console.log(revenueByProduct);
    //                     arr.push(revenueByProduct)

    //                 } else {
    //                     revenueByProduct[productId] = revenue;
    //                     console.log(revenueByProduct);

    //                 }
    //             });
    //         });
    //         console.log(revenueByProduct);
    //         res.status(200).json({ success: true, data: arr });

    //     } catch (error) {
    //         res.status(200).json({ success: false, data: error });

    //     }
    fetchData: async (order, accumulator) => {
        for (const item of order.cart.items) {
            const productId = item.productId;
            const pro = await productController.findById(productId);
            const quantity = item.quantity;
            const sellingPrice = pro.price;
            const revenue = quantity * sellingPrice;

            const productRevenue = {
                "name": pro.name,
                "revenue": revenue,
                "id": pro._id,
                "quantity": quantity,
                "slug": pro.slug,
            };

            const existingItemIndex = accumulator.findIndex((item) => item.slug === productRevenue.slug);
            console.log(existingItemIndex);
            console.log(accumulator);

            if (existingItemIndex === -1) {
                accumulator.push(productRevenue);
            } else {
                accumulator[existingItemIndex].quantity += quantity;
                accumulator[existingItemIndex].revenue += revenue;
            }
        }
    },

    fetchAllData: async (orders) => {
        const accumulator = [];
        for (const order of orders) {
            await productController.fetchData(order, accumulator);
        }
        return accumulator;
    },

    statisticSaleByProduct: async (req, res) => {
        try {
            const data = await Order.aggregate([
                { $unwind: '$cart.items' },
                {
                    $group: {
                        _id: '$cart.items.productId',
                        productName: { $first: '$cart.items.name' },
                        productImg: { $first: '$cart.items.img' },
                        totalQuantity: { $sum: '$cart.items.quantity' },
                        totalSale: { $sum: '$cart.items.total' },

                    },
                },
            ])
            res.status(200).json({ success: true, data: data });
        } catch (error) {
            res.status(200).json({ success: false, data: error });
        }
    },

    statisticSaleByMonth: async (req, res) => {
        try {
            const orders = await Order.find({ status: 1 });
            const revenueByMonthYear = {};
            const data = {}
            orders.forEach((order) => {
                const month = order.createdAt.getMonth() + 1;
                const year = order.createdAt.getFullYear();
                const monthYearKey = `${month}-${year}`;


                if (revenueByMonthYear[monthYearKey]) {
                    revenueByMonthYear[monthYearKey] += order.totalPrice;
                    data.price += order.totalPrice;
                } else {
                    revenueByMonthYear[monthYearKey] = order.totalPrice;
                    data.price = order.totalPrice;
                }
            });

            res.status(200).json({ success: true, data: data });
        } catch (error) {
            res.status(200).json({ success: false, data: error });
        }
    },

    getMostSoldProduct: async () => {
        try {
            const mostSoldProduct = await Order.aggregate([
                { $unwind: "$cart.items" },
                {
                    $group: {
                        _id: "$cart.items.productId",
                        totalQuantity: { $sum: "$cart.items.quantity" },
                        quantity: { $first: "$cart.items.quantity" }, // Số lượng sản phẩm trong mục đầu tiên
                    },
                },
                { $sort: { totalQuantity: -1 } },
                { $limit: 1 },
            ]);

            if (mostSoldProduct.length > 0) {
                const productId = mostSoldProduct[0]._id;
                const product = await Product.findById(productId);
                const mostSoldQuantity = mostSoldProduct[0].totalQuantity;
                const data = {
                    product: product,
                    quantity: mostSoldQuantity
                }
                return data;
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    },

    getLeastSoldProduct: async () => {
        try {
            const leastSoldProduct = await Order.aggregate([
                { $unwind: "$cart.items" },
                {
                    $group: {
                        _id: "$cart.items.productId",
                        totalQuantity: { $sum: "$cart.items.quantity" },
                        quantity: { $first: "$cart.items.quantity" }, // Số lượng sản phẩm trong mục đầu tiên
                    },
                },
                { $sort: { totalQuantity: 1 } },
                { $limit: 1 },
            ]);

            if (leastSoldProduct.length > 0) {
                const productId = leastSoldProduct[0]._id;
                const product = await Product.findById(productId);
                const leastSoldQuantity = leastSoldProduct[0].totalQuantity;
                const data = {
                    product: product,
                    quantity: leastSoldQuantity
                } // Thêm trường quantity vào đối tượng product
                return data;
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    },

    getLeastAndMost: async (req, res) => {
        try {
            const mostSoldProduct = await productController.getMostSoldProduct();
            const leastSoldProduct = await productController.getLeastSoldProduct();
            res.status(200).json({ success: true, data: { mostSoldProduct, leastSoldProduct } });
        }
        catch {
            res.status(200).json({ success: false, data: { mostSoldProduct: null, leastSoldProduct: null } });
        }
    },

    sumQuantityProductSale: async (req, res) => {
        try {
            const result = await Order.aggregate([
                { $unwind: '$cart.items' },
                { $group: { _id: null, totalQuantity: { $sum: '$cart.items.quantity' } } },
            ]);
            res.status(200).json({ success: true, data: result });
        } catch (err) {
            res.status(200).json({ success: false, data: err });
        }
    },

    getSaleEachMonth: async (req, res) => {
        try {
            const result = await Order.aggregate([
                {
                    $group: {
                        _id: {
                            $dateToString: { format: '%Y-%m', date: '$createdAt' },
                        },
                        totalRevenue: { $sum: '$totalPrice' },
                    },
                },
                { $sort: { '_id': 1 } },
            ])
            res.status(200).json({ success: true, data: result });

        } catch (error) {
            res.status(200).json({ success: false, data: error });

        }
    },

    getSaleByMonthYear: async (req, res) => {
        try {
            const month = req.body.month
            const year = req.body.year

            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 0);

            const result = await Order.aggregate([
                {
                    $match: {
                        createdAt: { $gte: startDate, $lte: endDate }, // Lọc theo thời gian từ ngày đầu tháng đến ngày cuối tháng
                    },
                },
                {
                    $group: {
                        _id: null,
                        totalRevenue: { $sum: '$totalPrice' }, // Tính tổng doanh thu
                    },
                },
            ])
            res.status(200).json({ success: true, data: result });

        } catch (error) {
            res.status(200).json({ success: false, data: error });

        }
    },

    getSalesStatistics: async (req, res) => {
        try {
            const month = req.query.month;
            const year = req.query.year;

            console.log(month, year);

            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 0);

            const data = await Order.aggregate([
                { $unwind: '$cart.items' },
                {
                    $group: {
                        _id: '$cart.items.productId',
                        productName: { $first: '$cart.items.name' },
                        productImg: { $first: '$cart.items.img' },
                        totalQuantity: { $sum: '$cart.items.quantity' },
                        totalCost: { $sum: { $multiply: ['$cart.items.quantity', '$cart.items.priceIn'] } },
                        totalSale: { $sum: '$cart.items.total' },
                    },
                },
                {
                    $addFields: {
                        total: { $subtract: ['$totalSale', '$totalCost'] },
                    },
                },
            ])
            // const data = await Order.aggregate([
            //     { $unwind: '$cart.items' },
            //     {
            //         $lookup: {
            //             from: 'products', // Tên bảng "products"
            //             localField: 'cart.items.productId',
            //             foreignField: '_id',
            //             as: 'product',
            //         },
            //     },
            //     {
            //         $unwind: '$product',
            //     },
            //     {
            //         $group: {
            //             _id: '$cart.items.productId',
            //             productName: { $first: '$product.name' },
            //             productImg: { $first: '$product.img' },
            //             totalQuantity: { $sum: '$cart.items.quantity' },
            //             totalSale: { $sum: '$cart.items.total' },
            //             totalCost: { $sum: { $multiply: ['$product.in_stock', '$product.priceIn'] } },
            //             inStock: { $first: '$product.in_stock' },
            //             profit: { $sum: { $subtract: ['$cart.items.total', { $multiply: ['$product.in_stock', '$product.cost'] }] } },
            //         },
            //     },
            // ]);

            const result = await Order.aggregate([
                {
                    $match: {
                        createdAt: { $gte: startDate, $lte: endDate },
                    },
                },
                {
                    $group: {
                        _id: null,
                        totalRevenue: { $sum: '$totalPrice' },
                    },
                },
            ])

            const sumProfit = await Order.aggregate([
                {
                    $unwind: "$cart.items" // Tách các mục trong giỏ hàng thành các bản ghi riêng biệt
                },
                {
                    $group: {
                        _id: null,
                        totalSales: { $sum: { $multiply: ["$cart.items.price", "$cart.items.quantity"] } },
                        totalProfit: { $sum: { $multiply: [{ $subtract: ["$cart.items.price", "$cart.items.priceIn"] }, "$cart.items.quantity"] } }
                    }
                },
                {
                    $addFields: {
                        total: { $subtract: ['$totalSale', '$totalProfit'] },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        totalSales: 1,
                        totalProfit: 1,
                        total: 1,
                    }
                }
            ]);

            const totalQuantityResult = await Order.aggregate([
                { $unwind: '$cart.items' },
                { $group: { _id: null, totalQuantity: { $sum: '$cart.items.quantity' } } },
            ]);

            res.status(200).json({
                success: true,
                data: {
                    productStats: data,
                    totalRevenue: result[0].totalRevenue,
                    sumProfit: sumProfit[0].totalProfit,
                    totalQuantity: totalQuantityResult[0].totalQuantity,
                },
            });
        } catch (error) {
            res.status(200).json({ success: false, data: error });
        }
    },

    getCost: async (req, res) => {
        const sumCost = await Product.aggregate([
            {
                $group: {
                    _id: null,
                    totalCost: { $sum: "$priceIn" }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalCost: 1
                }
            }
        ]);
        console.log(sumCost);
        res.status(200).json({ success: true, data: sumCost });

    }
}

module.exports = productController;
