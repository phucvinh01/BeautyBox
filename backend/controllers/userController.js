const { User } = require('../model/user')
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt')


const UserController = {

    getAll: async (req, res) => {
        try {
            const data = await User.find({})
            res.status(200).json({
                status: true,
                data: data,
            });
        } catch (err) {
            res.status(500).json({
                status: false,
                erorrs: err,
            });
        }
    },

    updateInforCustomer: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);

            const updateUser = await user.updateOne({ $set: req.body });
            res.status(200).json({
                status: true,
                data: updateUser,
            });
        } catch (error) {
            res.status(200).json({
                status: false,
                data: error
            });
        }
    },

    updateCodeResetPassword: async (req, res) => {
        try {

            const min = 100000;
            const max = 999999;
            const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            //console.log("check 1", randomNumber);
            const user = await User.findOne({ email: req.body.email });
            if (user) {
                await user.updateOne({ $set: { codeReset: randomNumber } });
                const transporter = nodemailer.createTransport({
                    host: 'smtp-mail.outlook.com',
                    port: 587,
                    secure: false, // true nếu sử dụng cổng 465
                    auth: {
                        user: process.env.userEmail,
                        pass: process.env.passEmail
                    },
                    tls: {
                        ciphers: 'SSLv3'
                    }
                });
                const mailOptions = {
                    from: 'omogo2002@gmail.com',
                    to: req.body.email,
                    subject: 'Reset mật khẩu',
                    html: `<div>
                    <h1>Xin chào ${req.body.email} </h1>
                    <h3>Đây là mã code để reset lại mật khẩu của bạn</h3>
                    <p>Cảm ơn bạn đã mua hàng tại cửa hàng</p>
                    <p><strong>${randomNumber}</strong></p>`
                };
                //console.log("check 2", randomNumber);

                // Gửi email
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.error('Error sending email:', error);
                    } else {
                        console.log('Email sent:', info.response);
                    }
                });
                //console.log("check 3", randomNumber);

                res.status(200).json({
                    status: true,
                    data: randomNumber,
                });
            }
            else {
                res.status(200).json({
                    status: false,
                    data: "Email không tồn tại"
                });
            }

        } catch (error) {
            res.status(200).json({
                status: false,
                data: error
            });
        }
    },

    getCheckCode: async (req, res) => {
        try {

            const email = req.query.email;
            const otp = req.query.otp;
            const check = await User.findOne({ email: email, codeReset: otp })
            console.log(check);
            if (check) {
                res.status(200).json({
                    status: true,
                    data: check,
                });
            }
            else {
                res.status(200).json({
                    status: false,
                    data: "Thông tin sai",
                });
            }
        } catch (err) {
            res.status(200).json({
                status: false,
                data: err,
            });
        }
    },

    updatePassword: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const email = req.body.email;
            const otp = req.body.otp;
            const password = req.body.password
            const hashedPassword = await bcrypt.hash(password, salt);
            const check = await User.findOne({ email: email, codeReset: otp })
            const update = await check.updateOne({ $set: { password: hashedPassword } });
            console.log("check update", update);
            if (update) {
                res.status(200).json({
                    status: true,
                    data: update,
                });
            }
            else {
                res.status(200).json({
                    status: false,
                    data: "Thông tin sai",
                });
            }
        } catch (err) {
            res.status(200).json({
                status: false,
                data: err,
            });
        }
    }


};

module.exports = UserController;