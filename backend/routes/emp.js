const EmployeeController = require("../controllers/empController");

const router = require("express").Router();

//CRETAE
router.post("/create-emp", EmployeeController.createEmployee);
//EDIT
router.post("/edit-emp/:id", EmployeeController.editEmployee);
//EDIT ACCOUNT
router.post("/edit-active/:id", EmployeeController.editAccountActive);
//GET
router.get("/", EmployeeController.getAllEmp);
//LOGIN
router.post("/login", EmployeeController.loginEmp);


module.exports = router;