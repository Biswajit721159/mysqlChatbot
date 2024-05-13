let Router = require("express");

let {dataInsert,dataUpdate,dataDelete}=require('../controler/EmployeeControlter')

const router = Router();


router.route('/').post(dataInsert)
router.route('/').put(dataUpdate)
router.route('/').delete(dataDelete)

module.exports = router;