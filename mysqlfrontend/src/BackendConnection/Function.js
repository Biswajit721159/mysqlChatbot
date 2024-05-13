var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;

export const functiondata = [
    {
        "name": "getAnyInformation",
        "description": "following is my db structure: Table: employees Columns: Employee_id int AI PK, first_name varchar(255) ,last_name varchar(255) ,email varchar(255) , date_of_birth date ,gender enum('Male','Female','Other') ,address text, phone_number varchar(20) ,hire_date date ,termination_date date ,salary decimal(10,2) ,created_at datetime ,updated_at datetime the second Table: employeeleave Columns:EmployeeLeave_id int AI PK ,employee_reference_id int ,leave_from datetime ,leave_to datetime ,number_of_days int ,reason text ,requester_status varchar(50) ,approver_status varchar(50) ,leaves_availed float ,leave_type varchar(50) ,back_to_office_on varchar(50) ,created_at datetime ,updated_at datetime ans the third Table: employeeposition Columns:,position_id int AI PK ,employee_reference_id int ,position varchar(255) ,active_status enum('Active','Inactive') ,salary decimal(10,2) ,employee_type enum('Full-time','Part-time','Contractor') ,employee_status enum('Active','Terminated') ,created_at datetime ,updated_at datetime.",
        "parameters": {
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "A valid SQL query to fetch information from the database."
                }
            },
            "required": ["query"]
        }
    },
    // {
    //     "name": "getEmployeeCountByDate",
    //     "description": `The function responds to user inquiries about the number of employees or persons who have taken leave on a particular date.Remember the today's date is ${today}`,
    //     "parameters": {
    //         "type": "object",
    //         "properties": {
    //             "date": {
    //                 "type": "string",
    //                 "description": "The date in 'year-month-day' format (e.g., 2024-02-23)"
    //             }
    //         },
    //         "required": [" date in 'year-month-day' format (e.g., 2024-02-23)"]
    //     }
    // },
    // {
    //     "name": "getEmployeeNameByDate",
    //     "description": `The function triggers a response solely in response to user inquiries about the name of employee or person who have taken leave on a particular date or day. Remember the today's date is ${today}.It processes the user-provided date, return it into the standard format 'year-month-day' (e.g., 2024-02-23)  `,
    //     "parameters": {
    //         "type": "object",
    //         "properties": {
    //             "date": {
    //                 "type": "string",
    //                 "description": "The date in 'year-month-day' format. Example: 2024-02-23"
    //             }
    //         },
    //         "required": [" date in 'year-month-day' format (e.g., 2024-02-23)"]
    //     }
    // },
    // {
    //     "name": "getEmployeeNameByYear",
    //     "description": `The function triggers a response solely in response to user inquiries about the name of employee or person who have taken leave on a year. Remember we are now in ${yyyy}.It processes the user-provided date, return it into the standard format 'year' (e.g., 2024 ,2023 ,2022)  `,
    //     "parameters": {
    //         "type": "object",
    //         "properties": {
    //             "year": {
    //                 "type": "string",
    //                 "description": "The year in 'year' format. Example: 2024 ,2023"
    //             }
    //         },
    //         "required": [" year in 'year' format (e.g., 2024 , 2023, 2024)"]
    //     }
    // },
    // {
    //     "name": "getEmployeeCountByYear",
    //     "description": `The function triggers a response solely in response to user inquiries about the count of employee or person who have taken leave on a year. Remember we are now in ${yyyy}.It processes the user-provided date, return it into the standard format 'year' (e.g., 2024 ,2023 ,2022)  `,
    //     "parameters": {
    //         "type": "object",
    //         "properties": {
    //             "year": {
    //                 "type": "string",
    //                 "description": "The year in 'year' format. Example: 2024 ,2023"
    //             }
    //         },
    //         "required": [" year in 'year' format (e.g., 2024 , 2023, 2024)"]
    //     }
    // },
    // {
    //     "name": "getEmployeeNameByTwoDate",
    //     "description": `The function triggers a response solely in response to user inquiries about the name of employee or person who have taken leave on a particular date Range. Remember the today's date is ${today}.It processes the user-provided date, return those Two date into standard format 'year-month-day' (e.g., 2024-02-23)  `,
    //     "parameters": {
    //         "type": "object",
    //         "properties": {
    //             "startdate": {
    //                 "type": "string",
    //                 "description": "The startdate in 'year' format. format (e.g., 2024-02-23)"
    //             },
    //             "lastdate": {
    //                 "type": "string",
    //                 "description": "The lastdate in 'year' format. format (e.g., 2024-02-23)"
    //             }
    //         },
    //         "required": ["startdate in 'date' format (e.g., 2024-02-23)", "lastdate in 'date' format (e.g., 2024-02-23)"]
    //     }
    // },
    // {
    //     "name": "getEmployeeCountByTwoDate",
    //     "description": `The function triggers a response solely in response to user inquiries about the count of employee or person who have taken leave on a particular date Range. Remember the today's date is ${today}.It processes the user-provided date, return those Two date into standard format 'year-month-day' (e.g., 2024-02-23)`,
    //     "parameters": {
    //         "type": "object",
    //         "properties": {
    //             "startdate": {
    //                 "type": "string",
    //                 "description": "The startdate in 'year' format. format (e.g., 2024-02-23)"
    //             },
    //             "lastdate": {
    //                 "type": "string",
    //                 "description": "The lastdate in 'year' format. format (e.g., 2024-02-23)"
    //             }
    //         },
    //         "required": ["startdate in 'date' format (e.g., 2024-02-23)", "lastdate in 'date' format (e.g., 2024-02-23)"]
    //     }
    // },
];