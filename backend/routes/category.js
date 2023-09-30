const categoryController = require('../controllers/categoryController')
const productController = require('../controllers/productController')

const router = require("express").Router();

//CRETAE
router.post("/", categoryController.create);

//GET ALL
router.get("/", categoryController.getAll);

//GET ONE
router.get("/:category", productController.getByCategory);


module.exports = router;