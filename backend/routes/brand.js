const brandController = require("../controllers/brandController");

const router = require("express").Router();

//CRETAE
router.post("/", brandController.create);

//GET ALL
router.get("/", brandController.getAll);

//GET ONE
router.get("/:id", brandController.getById);

//UPDATE 
router.put("/:id", brandController.updateBrand);

//DELETE 
router.delete("/:id", brandController.deleteBrand);


module.exports = router;