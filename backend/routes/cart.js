const cartController = require('../controllers/cartController')

const router = require("express").Router();

//CRETAE
router.post("/add-to-cart", cartController.addToCart);
router.get("/:id", cartController.getCart);
router.put("/", cartController.decreaseQuantity);
router.delete("/", cartController.removeItem);
module.exports = router;