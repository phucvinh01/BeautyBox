
const { Cart } = require('../model/cartModel')
const { Product } = require('../model/productModel')
const { User } = require('../model/userModel')
const { Order } = require('../model/orderModel')
const orderController = {
    addOrder: async (req, res) => {
        try {
            const cart = req.body.cart
            const userId = req.body.userId
            const shippingInfor = req.body.shippingInfor
            const totalPrice = req.body.totalPrice
            const note = req.body.note
            const methodShip = req.body.methodShip
            console.log("check userId", userId);
            let user = await User.findById(userId)
            console.log("check user order", user);
            if (!user) {
                res.status(200).json({ status: false, message: "user not found" })
            }
            else {
                const orderData = {
                    userId: userId,
                    cart: cart,
                    shippingInfor: shippingInfor,
                    totalPrice: totalPrice,
                    note: note,
                    methodShip: methodShip
                }
                let order = new Order(orderData)
                if (order.save()) {
                    res.status(200).json({ status: true, message: "Successfull" })
                }
            }


        }
        catch (err) {
            res.status(200).json({ status: false, message: 'Unsuccessfull' })
        }

    },
    getAll: async (req, res) => {
        try {
            const orders = await Order.find().sort({ createdAt: -1 });
            if (orders) {
                res.json({
                    status: 200,
                    data: orders,
                })
            }
        }
        catch (err) {
            if (err) {
                res.json({
                    status: 500,
                    erorrs: err,
                })
            }
        }
    },

    getById: async (req, res) => {
        try {
            let userId = req.params.id;
            let orders = await Order.find({ userId: userId });
            if (orders) {
                res.status(200).json({
                    status: true,
                    data: orders,
                })
            }
        } catch (error) {
            res.status(200).json({
                status: false,
                data: null,
                message: error
            })
        }
    }
}



module.exports = orderController;