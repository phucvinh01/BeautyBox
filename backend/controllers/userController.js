const { User } = require('../model/user')


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
};

module.exports = UserController;