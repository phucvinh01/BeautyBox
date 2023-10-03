const orderController = require("../controllers/orderController");
const cartController = require("../controllers/cartController");

const router = require("express").Router();

//CRETAE
router.post("/add-new-order", orderController.addOrder);

//GET ALL
router.get("/", orderController.getAll);

//GET ONE
router.get("/:id", orderController.getById);



module.exports = router;