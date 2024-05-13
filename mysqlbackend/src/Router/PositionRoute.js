let Router = require("express");
const router = Router();

let { getEmployeebyPosition, getAnyInformation } = require('../controler/PositionControler')

router.route('/getEmployeebyPosition').post(getEmployeebyPosition)
router.route('/getAnyInformation').post(getAnyInformation)

module.exports = router;