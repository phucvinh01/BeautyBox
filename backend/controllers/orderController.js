
const { Cart } = require('../model/cartModel')
const { Product } = require('../model/productModel')
const { User } = require('../model/user')
const { Order } = require('../model/orderModel')
const nodemailer = require('nodemailer');
const axios = require('axios');

const apiKey = '40015B1E542C2939D0BF1C4CDCD0DE466F64'

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
    },

    updateConfirmOrderAndSentEmail: async (req, res) => {


        try {
            let id = req.params.id;

            const updateOrder = await Order.findOneAndUpdate({ _id: id }, { 'status': 1 })

            if (updateOrder) {
                res.status(200).json({
                    success: true,
                    data: updateOrder
                })
            }

            const user = await User.findById(updateOrder.userId)

            console.log(user);

            const transporter = nodemailer.createTransport({
                host: 'smtp.elasticemail.com',
                port: 2525,
                auth: {
                    user: 'beautyboxsetmail@gmail.com',
                    pass: 'B2ACF07570768953B98E811D78A0F9BB18AD',
                },
            });

            const mailOptions = {
                from: 'beautyboxsentmail@gmail.com',
                to: 'omogo2002@gmail.com',
                subject: 'Xác nhận đơn hàng',
                html: `<div>
                    <h1>Xin chào ${user.email} }</h1>
                    <h3>Đơn hàng đặt của bạn được đã được xác nhận, chúng tôi sẽ tiến hành soạn đơn và gữi cho nhà vận chuyển</h3>
                    <p>Cảm ơn bạn đã mua hàng tại cửa hàng</p>
                    <h4>Thông tin đơn hàng</h4>
                    <p>Danh sách sản phẩm</p>
                    ${updateOrder.cart.items?.map((item) => {
                    return `
                        <div>
                            <img src="${item.img}" alt="img" />
                            <span>Tên sản phẩm: ${item.name}</span><br />
                            <p>Số lượng: ${item.quantity}</p>
                            <strong>Giá: ${item.price}</strong>
                        </div>
                    `;
                }).join('')
                    }
                    <p>Tổng cộng: ${updateOrder.cart.subTotal}</p>
                    <h3>Thông tin vận chuyển</h3>
                    <p>${updateOrder.shippingInfor}</p>
                    <p>Hình thức: ${updateOrder.methodShip}</p>
                </div>`,
            };

            // Gửi email
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.error('Error sending email:', error);
                } else {
                    console.log('Email sent:', info.response);
                }
            });
        }
        catch (error) {
            console.error('Error sending email:', error.message);
        }
    }
}




module.exports = orderController;