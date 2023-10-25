const distributorController = require("../controllers/distributorController");

const router = require("express").Router();

//CRETAE
router.post("/", distributorController.create);

//GET ALL
router.get("/", distributorController.getAll);

//GET ONE
router.get("/:id", distributorController.getById);

//UPDATE 
router.put("/:id", distributorController.updateDistributor);

//DELETE 
router.delete("/:id", distributorController.deleteDistributor);


module.exports = router;