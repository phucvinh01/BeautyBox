const { Product } = require('../model/productModel');
const { Receipt } = require('../model/receiptModel');

const receiptController = {
    create: async (req, res) => {
        const productId = req.body.productId;
        const quantity = req.body.quantity;

        const newReceipt = new Receipt({ ...req.body });
        try {
            const product = await Product.findById(productId);
            const p = product.in_stock + quantity
            if (product) {
                await product.updateOne({ in_stock: p });
                const savedReceipt = await newReceipt.save();
                res
                    .status(200)
                    .json({
                        success: true,
                        message: 'Receipt submitted',
                        data: savedReceipt,
                    });
            } else {
                res.status(500).json({ success: false, message: 'Failed to create 1' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: 'Failed to create 2' });
        }
    },

    get: async (req, res) => {
        try {
            const receipts = await Receipt.find({})
                .populate('productId')
                .populate('employeeId')
                .exec();

            console.log(receipts);

            res.status(200).json({ success: true, data: receipts });
        } catch (error) {
            console.error('Error in fetching receipts:', error);
            res.status(500).json({ success: false, message: 'Failed to fetch receipts' });
        }
    },
};

module.exports = receiptController;
