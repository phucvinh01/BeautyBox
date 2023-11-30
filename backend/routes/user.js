const UserController = require("../controllers/userController");
const router = require("express").Router();


router.get('/', UserController.getAll)
router.put('/:id', UserController.updateInforCustomer)
router.put('/reset/code/', UserController.updateCodeResetPassword)
router.get('/check-code/', UserController.getCheckCode)
router.put('/update/password/', UserController.updatePassword)


module.exports = router;