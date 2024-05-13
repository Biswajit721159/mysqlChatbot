const dbConfig = require('../Connection/dbConfig');
const Dbconnection = require('../schema/EmployeeSchema')

const dataInsert = async (req, res) => {
    res.send("dataInsert")
}


const dataUpdate = async (req, res) => {
    res.send("dataUpdate")
}


const dataDelete = async (req, res) => {
    try {
        let employeeId = req.body.employee_id;
        const connection = await dbConfig()
        const [result] = await connection.execute(
            'DELETE FROM Employees WHERE Employee_id = ?',
            [employeeId]
        );
        await connection.end();
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Employee not found or already deleted' });
        }
        return res.status(200).json({ message: 'Employee Deleted successfully' });
    } catch (error) {
        console.error('Error deleting employee:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}





module.exports = { dataInsert, dataUpdate, dataDelete }