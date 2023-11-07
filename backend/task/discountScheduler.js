const cron = require('node-cron');
const { Product } = require('../model/productModel');

// Cấu hình công việc lập lịch chạy mỗi giờ
const task = cron.schedule('* * * * *', async () => {
    try {
        const currentTime = new Date();

        const productsToUpdate = await Product.find({ 'discount.timeEnd': { $lte: currentTime } });
        productsToUpdate.forEach(async (product) => {
            product.discount.number = 0,
                product.discount.timeBegin = null,
                product.discount.timeEnd = null,
                product.price = product.priceSale,
                await product.save();
        });
        console.log('Updated products:', productsToUpdate);
    } catch (error) {
        console.error('Error updating products:', error);
    }
});

module.exports = { task }