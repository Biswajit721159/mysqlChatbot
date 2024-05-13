let Router = require("express");
const router = Router();

let { getEmployeeCountByDate, getEmployeeNameByDate, getEmployeeCountByYear, getEmployeeNameByYear, getEmployeeCountByTwoDate, getEmployeeNameByTwoDate } = require('../controler/LeaveControler')


router.route('/getEmployeeCountByDate').post(getEmployeeCountByDate)
router.route('/getEmployeeNameByDate').post(getEmployeeNameByDate)

router.route('/getEmployeeCountByYear').post(getEmployeeCountByYear)
router.route('/getEmployeeNameByYear').post(getEmployeeNameByYear)

router.route('/getEmployeeCountByTwoDate').post(getEmployeeCountByTwoDate)
router.route('/getEmployeeNameByTwoDate').post(getEmployeeNameByTwoDate)


module.exports = router;