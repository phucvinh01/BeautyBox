
const { Cart } = require('../model/cartModel')
const { Product } = require('../model/productModel')
const { User } = require('../model/user')
const { Order } = require('../model/orderModel')
const nodemailer = require('nodemailer');
const axios = require('axios');
const moment = require('moment');

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

    sortObject: (obj) => {
        let sorted = {};
        let str = [];
        let key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                str.push(encodeURIComponent(key));
            }
        }
        str.sort();
        for (key = 0; key < str.length; key++) {
            sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
        }
        return sorted;
    },

    updateConfirmOrderAndSentEmail: async (req, res) => {


        try {
            let id = req.params.id;
            const imageWidth = 300;
            const imageHeight = 200;
            const updateOrder = await Order.findOneAndUpdate({ _id: id }, { 'status': 1 })

            if (updateOrder) {
                res.status(200).json({
                    success: true,
                    data: updateOrder
                })
            }

            const user = await User.findById(updateOrder.userId)


            const transporter = nodemailer.createTransport({
                // host: 'smtp.elasticemail.com',
                // port: 2525,
                // auth: {
                //     user: 'beautyboxsetmail@gmail.com',
                //     pass: 'B2ACF07570768953B98E811D78A0F9BB18AD',
                // },
                host: 'smtp-mail.outlook.com',
                port: 587,
                secure: false, // true nếu sử dụng cổng 465
                auth: {
                    user: 'omogo2002@gmail.com',
                    pass: '2001200636Th4_'
                },
                tls: {
                    ciphers: 'SSLv3'
                }
            });

            const mailOptions = {
                from: 'omogo2002@gmail.com',
                to: user.email,
                subject: 'Xác nhận đơn hàng',
                html: `<div>
                    <h1>Xin chào ${user.email} </h1>
                    <h3>Đơn hàng đặt của bạn được đã được xác nhận, chúng tôi sẽ tiến hành soạn đơn và gữi cho nhà vận chuyển</h3>
                    <p>Cảm ơn bạn đã mua hàng tại cửa hàng</p>
                    <h4>Thông tin đơn hàng</h4>
                    <p>Danh sách sản phẩm</p>
                    ${updateOrder.cart.items?.map((item) => {
                    return `
                        <div>
                            <img width="${imageWidth}" height="${imageHeight}" src="${item.img}" alt="${item.img}" />
                            <p>Tên sản phẩm: ${item.name}</p><br />
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
    },

    createPayment: async (req, res, next) => {
        process.env.TZ = 'Asia/Ho_Chi_Minh';

        let date = new Date();
        let createDate = moment(date).format('YYYYMMDDHHmmss');

        let ipAddr = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;


        let tmnCode = '';
        let secretKey = '';
        let vnpUrl = `https://sandbox.vnpayment.vn/paymentv2/vpcpay.html`;
        let returnUrl = `http://localhost:5173/order`;
        let orderId = moment(date).format('DDHHmmss');
        let amount = req.body.amount;
        let bankCode = req.body.bankCode;

        let locale = req.body.language;
        if (locale === null || locale === '') {
            locale = 'vn';
        }
        let currCode = 'VND';
        let vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
        vnp_Params['vnp_OrderType'] = 'other';
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        if (bankCode !== null && bankCode !== '') {
            vnp_Params['vnp_BankCode'] = bankCode;
        }

        vnp_Params = orderController.sortObject(vnp_Params);

        let querystring = require('qs');
        let signData = querystring.stringify(vnp_Params, { encode: false });
        let crypto = require("crypto");
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
        res.status(200).json({ paymentUrl: vnpUrl });
    },

    getUrlReturn: async (req, res, next) => {
        let vnp_Params = req.query;

        let secureHash = vnp_Params['vnp_SecureHash'];

        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        vnp_Params = sortObject(vnp_Params);

        let tmnCode = '';
        let secretKey = '';

        let querystring = require('qs');
        let signData = querystring.stringify(vnp_Params, { encode: false });
        let crypto = require("crypto");
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");

        if (secureHash === signed) {
            //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

            res.render('success', { code: vnp_Params['vnp_ResponseCode'] })
        } else {
            res.render('success', { code: '97' })
        }
    }
}




module.exports = orderController;