const dbConfig = require('../Connection/dbConfig');


const EmployeePosition = `CREATE TABLE IF NOT EXISTS EmployeePosition (
    position_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_reference_id INT,
    position VARCHAR(255),
    active_status ENUM('Active', 'Inactive'),
    salary DECIMAL(10, 2),
    employee_type ENUM('Full-time', 'Part-time', 'Contractor'),
    employee_status ENUM('Active', 'Terminated'),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_reference_id) REFERENCES Employees(Employee_id) ON DELETE CASCADE);`


async function createEmployeesPositionTable() {
    try {
        const connection = await dbConfig()
        if (!connection) {
            throw new Error("Database connection failed.");
        }
        await connection.execute(EmployeePosition)
        console.log("EmployeePosition Table is created")
        return connection;
    } catch (error) {
        console.log("EmployeePosition Table is not created")
        return error;
    }
}

module.exports = createEmployeesPositionTable