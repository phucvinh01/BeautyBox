const receiptController = require("../controllers/receiptController");
const router = require("express").Router();

router.post("/receipt-create", receiptController.create);

router.get("/receipt-create", receiptController.get);


module.exports = router;