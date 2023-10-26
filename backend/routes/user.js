const UserController = require("../controllers/userController");
const router = require("express").Router();


router.get('/', UserController.getAll)


module.exports = router;