
const { Cart } = require('../model/cartModel')
const { Product } = require('../model/productModel')
const { User } = require('../model/user')
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
            let user = await User.findById(userId)
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
                console.log(order.cart.items);
                for (let i = 0; i < cart.items.length; i++) {
                    let product = await Product.findById(cart.items[i].productId)
                    console.log(product);
                    if (product.in_stock >= cart.items[i].quantity) {
                        product.in_stock -= cart.items[i].quantity
                        await product.save()
                    } else {
                        return res.status(200).json({ status: false, message: "Product not in stock" })
                    }
                }
                const savedOrder = await order.save()
                if (savedOrder) {
                    res.status(200).json({ status: true, message: "Successfull" })
                }
            }
        }
        catch (err) {
            res.status(200).json({ status: false, message: err })
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
    },

    getTopCustomerOrder: async (req, res) => {
        try {
            const order = Order.aggregate([
                {
                    $group: {
                        id: '$userId',
                        totalItems: { $sum: { $size: '$cart.quantity' } }
                    }
                },
                {
                    $sort: { totalItems: -1 }
                },
                {
                    $limit: 5
                }
            ])

            console.log(order)

            if (order) {
                res.status(200).json({
                    status: true,
                    data: order
                })
            }
        }
        catch (err) {
            res.status(200).json({
                status: false,
                data: null,
                message: err
            })
        }
    }

}



module.exports = orderController;