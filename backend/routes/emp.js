const EmployeeController = require("../controllers/empController");

const router = require("express").Router();

//CRETAE
router.post("/create-emp", EmployeeController.createEmployee);
//GET
router.get("/", EmployeeController.getAllEmp);
//LOGIN
router.post("/login", EmployeeController.loginEmp);


module.exports = router;