const authController = require("../controllers/authController");
const router = require("express").Router();

router.post('/', authController.create)
router.post('/login', authController.login)
router.post('/refresh', authController.refresh)
router.post('/logout', authController.logout)


module.exports = router;
