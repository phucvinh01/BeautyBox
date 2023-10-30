const Employee = require("../model/employeeModel");
const bcrypt = require('bcrypt')

const EmployeeController = {


    loginEmp: async (req, res) => {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const Emp = await Employee.findOne({ email: email })
            console.log(Emp);
            if (!Emp) {
                return res.status(201).json({ Ok: false, message: 'Email không tồn tại' });
            }

            const validPassword = await bcrypt.compare(
                password,
                Emp.password
            )

            if (!validPassword) {
                return res.status(201).json({ Ok: false, message: 'Mật khẩu không đúng' });
            }
            if (Emp && validPassword) {
                delete Emp.password
                res.status(200).json({ data: Emp, Ok: true })
            }
        } catch (error) {
            res.status(201).json({ Ok: false, message: 'Tên đăng nhập và mật khẩu không đúng' })
        }
    },

    getAllEmp: async (req, res) => {
        try {
            const employees = await Employee.find();
            res.status(200).json({
                status: true,
                data: employees
            });
        } catch (error) {
            res.status(400).json({
                status: false,
                message: error
            });
        }
    },

    createEmployee: async (req, res) => {
        try {

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const existingEmail = await Employee.findOne({ email: req.body.email });
            const existingPhone = await Employee.findOne({ phone: req.body.phone });

            if (existingEmail) {
                return res.status(400).json({ status: false, message: 'Nhân viên đã tồn tại' });
            }
            if (existingPhone) {
                return res.status(400).json({ status: false, message: 'Nhân viên đã tồn tại' });
            }
            const employeeTemp = new Employee(req.body);
            employeeTemp.password = hashedPassword
            const newEmployee = await employeeTemp.save();
            console.log(newEmployee);
            if (newEmployee) {
                res.status(201).json({
                    status: true,
                    data: newEmployee
                });
            }
            else {
                res.status(400).json({
                    status: false,
                    message: 'Employee not created'
                });
            }
        } catch (error) {
            res.status(400).json({
                status: false,
                message: error
            });
        }
    }

};

module.exports = EmployeeController;
