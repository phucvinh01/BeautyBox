const UserController = require("../controllers/userController");
const router = require("express").Router();


router.get('/', UserController.getAll)
router.put('/:id', UserController.updateInforCustomer)
router.put('/reset/code/', UserController.updateCodeResetPassword)


module.exports = router;