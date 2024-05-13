const dbConfig = require('../Connection/dbConfig');

const EmployeeLeave = `CREATE TABLE IF NOT EXISTS EmployeeLeave (
    EmployeeLeave_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_reference_id INT,
    leave_from DATETIME,
    leave_to DATETIME,
    number_of_days INT,
    reason TEXT,
    requester_status VARCHAR(50),
    approver_status VARCHAR(50),
    leaves_availed FLOAT,
    leave_type VARCHAR(50),
    back_to_office_on VARCHAR(50),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_reference_id) REFERENCES Employees(Employee_id) ON DELETE CASCADE);`


async function createEmployeesLeaveTable() {
    try {
        const connection = await dbConfig()
        if (!connection) {
            throw new Error("Database connection failed.");
        }
        await connection.execute(EmployeeLeave)
        console.log("EmployeeLeave Table is created")
        return connection;
    } catch (error) {
        console.log("EmployeeLeave Table is not created")
        return error;
    }
}

module.exports = createEmployeesLeaveTable