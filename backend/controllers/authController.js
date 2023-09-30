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

            if (!email) {
                const newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: hashed,
                });

                const savedUser = await newUser.save()
                res.status(200).json({ success: true, message: 'Successfully created', savedUser })
                console.log("object");
            }
            else {
                console.log("error");
                return res.status(404).json({ success: false, message: 'Email is unique' })

            }
        } catch (error) {
            res.status(500).json({ success: false, message: 'Failed to create. Try again!' })
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
            const user = await User.findOne({ username: req.body.username })
            console.log(user);
            if (!user) {
                return res.status(404).json("wrong username")
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            )
            if (!validPassword) {
                return res.status(404).json("Wrong password")
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
                res.status(200).json({ ...orther, accessToken })
            }
        }
        catch {
            res.status(500).json({ success: false, message: 'Login fail' })
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