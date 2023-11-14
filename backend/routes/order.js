const orderController = require("../controllers/orderController");
const cartController = require("../controllers/cartController");

const router = require("express").Router();

//CRETAE
router.post("/add-new-order", orderController.addOrder);

//GET ALL
router.get("/", orderController.getAll);

//GET ONE
router.get("/:id", orderController.getById);

//CONFRIM
router.put("/confrim-order/:id", orderController.updateConfirmOrderAndSentEmail)

router.get("/get-top-5-user", orderController.getTopCustomerOrder)


router.post("/vnpay/create-payment", orderController.createPayment)

router.get('/vnpay_return', orderController.getUrlReturn)

module.exports = router;