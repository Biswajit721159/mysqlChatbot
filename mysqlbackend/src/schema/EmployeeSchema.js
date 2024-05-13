const dbConfig = require('../Connection/dbConfig');

const Employees=` CREATE TABLE IF NOT EXISTS Employees (
    Employee_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    date_of_birth DATE,
    gender ENUM('Male', 'Female', 'Other'),
    address TEXT,
    phone_number VARCHAR(20),
    hire_date DATE,
    termination_date DATE,
    salary DECIMAL(10, 2),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);`

async function createEmployeesTable() {
    try {
        const connection = await dbConfig()
        if (!connection) {
            throw new Error("Database connection failed.");
        }
        await connection.execute(Employees)
        console.log("Employee Table is created")
        return connection;
    } catch (error) {
        console.log("EmployeeLeave Table is not created")
        return error;
    }
}

module.exports = createEmployeesTable