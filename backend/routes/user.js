const middleware = require("../controllers/middleware");
const UserController = require("../controllers/userController");
const router = require("express").Router();


router.get('/', middleware.isAdmin, UserController.getAll)


module.exports = router;