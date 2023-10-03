const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { User } = require('../model/userModel')



let arrRefreshToken = [];


const authController = {
    create: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt)

            const email = await User.findOne({ email: req.body.email })
            if (email) {
                res.json({ status: false, message: "Email đã tồn tài" })
            }
            else if (!email) {
                const newUser = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    phone: req.body.phone,
                    email: req.body.email,
                    password: hashed,
                });

                const savedUser = await newUser.save()
                res.status(200).json({ status: true, message: 'Successfully' })
            }
            else {
                return res.status(200).json({ status: false, message: 'Unsuccessfully' })

            }
        } catch (error) {
            res.status(500).json({ success: false, message: 'Failed to create!' })
        }
    },

    accessToken: (user) => {
        return jwt.sign({
            id: user.id,
            admin: user.role
        }, process.env.jwtAssessKey, { expiresIn: "1d" })
    },

    refeshToken: (user) => {
        return jwt.sign({
            id: user.id,
            admin: user.role
        }, process.env.jwtAssessKey, { expiresIn: "365d" })
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body
            if (!email) {
                return res.status(201).json({ status: 2, message: "Vui lòng nhập Email của bạn" })
            }
            if (!password) {
                return res.status(201).json({ status: 2, message: "Vui lòng nhập Password của bạn" })
            }
            if (!email && !password) {
                return res.status(201).json({ status: 2, message: "Thiếu thông tin đăng nhập" })

            }
            const user = await User.findOne({ email: req.body.email })
            if (!user) {
                return res.status(201).json({ status: 2, message: "Tài khoản email không tồn tại" })
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            )
            if (!validPassword) {
                return res.status(201).json({ status: 2, message: "Password không đúng" })
            }
            if (user && validPassword) {
                const accessToken = authController.accessToken(user)
                const refeshToken = authController.refeshToken(user)
                arrRefreshToken.push(refeshToken)
                res.cookie("refreshToken", refeshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict"
                })
                const { password, ...orther } = user._doc;
                res.status(200).json({ ...orther, accessToken, status: 1 })
            }
        }
        catch {
            res.status(500).json({ status: 3, message: 'Đăng nhập không thành công' })
        }
    },

    refresh: async (req, res) => {


        const refeshToken = req.cookies.refreshToken

        if (!refeshToken) {
            return res.status(401).json("You are not authenticated")
        }
        if (!arrRefreshToken.includes(refeshToken)) {
            return res.status(403).json("Token invalid")
        }
        jwt.verify(refeshToken, process.env.jwtAssessKey, (err, user) => {
            if (err) {
                console.log(err);
            }
            arrRefreshToken = arrRefreshToken.filter((token) => token !== refeshToken)
            const newAccessToken = authController.accessToken(user)
            const newRefreshToken = authController.refeshToken(user)
            arrRefreshToken.push(newRefreshToken)
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict"
            })
            res.status(200).json({ accessToken: newAccessToken })

        })
    },

    logout: async (req, res) => {
        try {
            res.clearCookie("refreshToken")
            res.status(200).json({ success: true })
        }
        catch {
            res.status(404)
        }
    }
};

module.exports = authController;