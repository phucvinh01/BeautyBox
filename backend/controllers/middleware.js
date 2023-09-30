const jwt = require('jsonwebtoken')

const middleware = {
    verifyToken: (req, res, next) => {
        const token = req.headers.token
        if (token) {
            const assessToken = token.split(" ")[1]
            jwt.verify(assessToken, process.env.jwtAssessKey, (err, user) => {
                if (err) {
                    res.status(403).json("Token is not valid")
                }
                req.user = user
                next()
            })
        }
        else {
            res.status(401).json("You are not authenticated")
        }
    },

    isAdmin: (req, res, next) => {
        middleware.verifyToken(req, res, () => {
            console.log(req.user.admin)
            if (req.user.id == req.params.id || req.user.admin === 0) {
                next();
            }
            else {
                res.status(403).json({ "isAdmin": false, "body": "You are not allowed" })
            }
        })
    }

}

module.exports = middleware