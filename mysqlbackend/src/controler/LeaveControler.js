const dbConfig = require('../Connection/dbConfig');
let errormess = "while processing your request we are geting some error"

// for two date

const getEmployeeCountByTwoDate = async (req, res) => {
    try {
        let startdate = req.body.startdate;
        let lastdate = req.body.lastdate;
        if (startdate.length == 0 && lastdate.length == 0) {
            return res.send("Starting Date and Last Date are required")
        }
        if (startdate.length == 0) {
            return res.send("Starting Date is required")
        }
        if (lastdate.length == 0) {
            return res.send("Last Date is required")
        }
        if (await CompairTwoDate(startdate, lastdate) == true) {
            [startdate, lastdate] = [lastdate, startdate];
        }
        let data = await GetLeaveByYear(startdate, lastdate);
        let frequencyCounter = countFrequency(data);
        if (typeof (data) == "object" && data.length == 0) return res.send(`No Person are Found with in ${startdate} to ${lastdate}`)
        else if (typeof (data) == "string") {
            return res.send(errormess)
        }
        return res.send(`Total number of leave record from ${startdate} to ${lastdate} is ${data.length} ,involving ${Object.keys(frequencyCounter).length} person`);
    } catch {
        return res.send(errormess)
    }
}

const getEmployeeNameByTwoDate = async (req, res) => {
    try {
        let startdate = req.body.startdate;
        let lastdate = req.body.lastdate;
        if (startdate.length == 0 && lastdate.length == 0) {
            return res.send("Starting Date and Last Date are required")
        }
        if (startdate.length == 0) {
            return res.send("Starting Date is required")
        }
        if (lastdate.length == 0) {
            return res.send("Last Date is required")
        }
        if (await CompairTwoDate(startdate, lastdate) == true) {
            [startdate, lastdate] = [lastdate, startdate];
        }
        let data = await GetLeaveByYear(startdate, lastdate);
        if (typeof (data) == "object" && data.length == 0) {
            return res.send(`From ${startdate} to ${lastdate} we are getting 0 record`)
        }
        else if (typeof (data) == "string") {
            return res.send(errormess)
        }
        let frequencyCounter = countFrequency(data);
        const mySet = new Set();
        let name = `Here are the employee names along with their leave counts between ${startdate} and ${lastdate}: \n \n`
        for (let i = 0; i < data.length; i++) {
            let id = data[i].employee_reference_id;
            if (data[i]?.first_name && mySet.has(id) == false) {
                name += `${mySet.size + 1}. ${data[i].first_name} ${data[i].last_name}`
                name += `  ${frequencyCounter[id] == 1 ? 'Leave ' : "Leave's"} are - ${frequencyCounter[id]}\n`
                mySet.add(id)
            }
        }
        return res.send(name)
    } catch {
        return res.send(errormess)
    }
}

const CompairTwoDate = async (startdate, lastdate) => {
    startdate = new Date(startdate);
    lastdate = new Date(lastdate);
    if (startdate > lastdate) {
        return true
    }
    return false
}


// for year

const getEmployeeCountByYear = async (req, res) => {
    try {
        let year = req.body.year
        if (year.length == 0) {
            return res.send("We can not found any year")
        }
        let startDate = `${year}-01-01`
        let lastDate = `${year}-12-31`
        let data = await GetLeaveByYear(startDate, lastDate)
        if (typeof (data) == "object" && data.length == 0) {
            return res.send(`Total no. of Leave Record in ${year} is 0`)
        }
        else if (typeof (data) == "string") {
            return res.send(errormess)
        }
        let frequencyCounter = countFrequency(data)
        return res.send(`Total no. Of leave record in ${year} is ${data.length}, involving ${Object.keys(frequencyCounter).length} person`)
    } catch {
        return res.send(errormess)
    }
}

const getEmployeeNameByYear = async (req, res) => {
    try {
        let year = req.body.year
        if (year.length == 0) {
            return res.send("We can not found any year")
        }
        let startDate = `${year}-01-01`
        let lastDate = `${year}-12-31`
        let data = await GetLeaveByYear(startDate, lastDate)
        if (typeof (data) == "object" && data.length == 0) {
            return res.send(`Total no. of Leave Record in ${year} is 0`)
        }
        else if (typeof (data) == "string") {
            return res.send(errormess)
        }
        let frequencyCounter = countFrequency(data)
        const mySet = new Set();
        let name = `Here is the Employee Name with Leave count in ${year}- \n \n`
        for (let i = 0; i < data.length; i++) {
            let id = data[i].employee_reference_id;
            if (data[i]?.first_name && mySet.has(id) == false) {
                name += `${mySet.size + 1}. ${data[i].first_name} ${data[i].last_name}`
                name += `  ${frequencyCounter[id] == 1 ? 'Leave ' : "Leave's"} are - ${frequencyCounter[id]}\n`
                mySet.add(id)
            }
        }
        return res.send(name)
    } catch {
        return res.send(errormess)
    }
}

function countFrequency(data) {
    try {
        let frequencyCounter = {};
        for (let i = 0; i < data.length; i++) {
            let id = data[i].employee_reference_id;
            let day = parseInt(data[i].number_of_days) + 1;
            if (frequencyCounter[id]) {
                frequencyCounter[id] += day;
            } else {
                frequencyCounter[id] = day;
            }
        }
        return frequencyCounter;
    } catch {
        return errormess
    }
}

const GetLeaveByYear = async (startDate, lastDate) => {
    try {
        const connection = await dbConfig()
        const query = `
                    SELECT 
                        Employees.first_name, 
                        Employees.last_name, 
                        EmployeeLeave.*
                    FROM 
                        Employees, 
                        EmployeeLeave 
                    WHERE 
                        EmployeeLeave.employee_reference_id = Employees.employee_id 
                        AND DATE(EmployeeLeave.leave_from) >= ? 
                        AND DATE(EmployeeLeave.leave_from) <= ?`;

        const [result] = await connection.execute(query, [startDate, lastDate]);
        await connection.end();
        return result
    } catch (error) {
        return errormess
    }
}

// get data by date 
const getEmployeeCountByDate = async (req, res) => {
    try {
        let date = req.body?.date
        console.log(date)
        if (date.length == 0) {
            return res.send("We are not found any date")
        }
        let weekend = await isWeekend(date)
        if (weekend == true) {
            return res.send(`${date} is a weekend day`)
        }
        let data = await getLeave(date)
        if (typeof (data) === "object" && data.length == 0) return res.send(`we are not found any leave record`)
        else if (typeof (data) == "string") {
            return res.send(errormess)
        }
        else if (typeof (data) === "object") return res.send(`Total Person Leave on ${date} is : ${data?.length}`)
        else return res.send(errormess)
    } catch {
        return res.send(errormess)
    }
}

const getEmployeeNameByDate = async (req, res) => {
    try {
        let date = req.body?.date
        if (date.length == 0) {
            return res.send("We are not found any date")
        }
        if (await isWeekend(date)) {
            return res.send(`${date} is a weekend day`)
        }
        let data = await getLeave(date)
        if (typeof (data) == "object" && data.length == 0) return res.send(`We are not found person who are leave in ${date}`)
        else if (typeof (data) == "string") {
            return res.send(errormess)
        }
        let name = `Those Person who are Leave on ${date} is: \n \n`
        for (let i = 0; i < data?.length; i++) {
            if (data[i]?.first_name) {
                name += `${i + 1}. ${data[i].first_name}${data[i].last_name}(${data[i].leave_type})\n`
            }
        }
        return res.send(name)
    } catch {
        return res.send(errormess)
    }
}

async function getLeave(date) {
    try {
        const connection = await dbConfig()
        const query = 'SELECT Employees.first_name, Employees.last_name, EmployeeLeave.* FROM Employees, EmployeeLeave WHERE EmployeeLeave.employee_reference_id = Employees.employee_id AND DATE(EmployeeLeave.leave_from) = ?';
        const value = date;
        const [result] = await connection.execute(query, [value]);
        await connection.end();
        return result
    } catch (error) {
        return errormess;
    }
}


const isWeekend = async (date) => {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }
    var dayOfWeek = date.getDay();
    return (dayOfWeek === 6 || dayOfWeek === 0);
}

module.exports = { getEmployeeCountByDate, getEmployeeNameByDate, getEmployeeCountByYear, getEmployeeNameByYear, getEmployeeCountByTwoDate, getEmployeeNameByTwoDate }