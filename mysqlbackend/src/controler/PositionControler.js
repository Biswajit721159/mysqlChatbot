const dbConfig = require('../Connection/dbConfig');
let errormess = "while processing your request we are geting some error"


async function getEmployeebyPosition(req, res) {
    try {
        let position = req.body.position
        const connection = await dbConfig()
        const query = `SELECT 
                            tigersheet.Employees.first_name, 
                            tigersheet.Employees.last_name, 
                            tigersheet.employeeposition.*
                        FROM 
                            tigersheet.Employees, 
                            tigersheet.employeeposition 
                        WHERE 
                            tigersheet.employeeposition.employee_reference_id = tigersheet.Employees.employee_id and
                            tigersheet.employeeposition.position REGEXP ?;
                      `
        const [result] = await connection.execute(query, [position]);
        await connection.end();
        let name = `Hare are the Employee found of position ${position}-\n\n`
        name += getname(result)
        res.send(name)
    } catch {
        res.send(errormess)
    }
}

function getname(data) {
    let name = "";
    for (let i = 0; i < data.length; i++) {
        name += `${i + 1}. ${data[i].first_name} ${data[i].last_name} (${data[i].position})\n`
    }
    return name;
}

async function getEmployeeName(req, res) {
    try {
        let position = req.body.position
        const connection = await dbConfig()
        const query = `SELECT 
                            tigersheet.Employees.first_name, 
                            tigersheet.Employees.last_name, 
                            tigersheet.employeeposition.*
                        FROM 
                            tigersheet.Employees, 
                            tigersheet.employeeposition 
                        WHERE 
                            tigersheet.employeeposition.employee_reference_id = tigersheet.Employees.employee_id and
                            tigersheet.employeeposition.position REGEXP ?;
                      `
        const [result] = await connection.execute(query, [position]);
        await connection.end();
        let name = `Hare are the Employee found of position ${position}-\n\n`
        name += getname(result)
        res.send(name)
    } catch {
        res.send(errormess)
    }
}


async function getAnyInformation(req, res) {
    try {
        const query = req.body.query;
        console.log(query)
        const connection = await dbConfig()
        if (!connection) {
            return res.send("Result not found")
        }
        // console.log(connection)
        let [result] = await connection.execute(query);
        // console.log(result)
        if (typeof (result) == 'object' && result.length == 0) {
            return res.send("We have not found any result with your question.")
        }
        else if (typeof (result) != "object") {
            return res.send(result)
        }
        result.push(getdata(result))
        return res.send(result)
    } catch {
        return res.send(errormess)
    }
}

function getdata(result) {
    try {
        let output = "Here is Your output: \n\n"
        for (let i = 0; i < result.length; i++) {
            output += `${i + 1}. `
            for (let key in result[i]) {
                let keydata = key
                if (keydata[0] === keydata[0].toLowerCase()) {
                    keydata = keydata[0].toUpperCase() + keydata.slice(1);
                }
                let splittedArray = key.split('_');
                let data = "";
                for (let j = 0; j < splittedArray.length; j++) {
                    if (j == 0) {
                        let s = splittedArray[j];
                        if (s[0] === s[0].toLowerCase()) {
                            s = s[0].toUpperCase() + s.slice(1);
                        }
                        data += s
                    } else {
                        data += " ";
                        data += splittedArray[j];
                    }
                }
                output += ` ${data} - ${result[i][key]}  \n`
            }
            output += '\n'
        }
        // console.log(output)
        return output
    } catch {
        res.send(errormess)
    }
}


module.exports = { getEmployeebyPosition, getAnyInformation }