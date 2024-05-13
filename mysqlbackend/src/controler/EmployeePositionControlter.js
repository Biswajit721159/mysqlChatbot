const dbConfig = require('../Connection/dbConfig');
const Dbconnection = require('../schema/EmployeePositionSchema')

const dataInsert = async (req, res) => {
    res.send("dataInsert")
}



const dataUpdate = async (req, res) => {
    res.send("dataUpdate")
}



const dataDelete = async (req, res) => {
    res.send("dataDelate")
}



module.exports = { dataInsert, dataUpdate, dataDelete }