const router = require('express-promise-router')();
const employeeController = require('../controllers/employee.controller');

router.post('/employees', employeeController.createEmployee);
router.get('/employees', employeeController.listAllEmployees);
router.get('/employees/:tcno', employeeController.findEmployeeByTcno);
router.put('/employees/:tcno', employeeController.updateEmployeeByTcno);
router.delete('/employees/:tcno', employeeController.deleteEmployeeByTcno);

module.exports = router;
