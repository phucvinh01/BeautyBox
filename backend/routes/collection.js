const collectionController = require("../controllers/collectionController");

const router = require("express").Router();

//CRETAE
router.post("/", collectionController.create);

//GET ALL
router.get("/", collectionController.getAll);



module.exports = router;