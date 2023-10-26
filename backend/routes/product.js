const productController = require("../controllers/productController");

const router = require("express").Router();

//CRETAE
router.post("/", productController.create);

//GET ALL
router.get("/", productController.getAll);

//GET ONE
router.get("/:id", productController.getById);

//GET NEW 

router.get("/offset", productController.getOffsetNew);

//UPDATE 
router.put("/:id", productController.updateProduct);

//DELETE 
router.delete("/:id", productController.deleteProduct);

//SEARCH
router.post("/search/:name", productController.searchByName);

router.put("/updateActive/:id", productController.updateStatus);

router.put("/updateDiscount/:id", productController.updateDiscount);



module.exports = router;