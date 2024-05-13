let express = require("express");
let cors = require("cors");
let app = express();
const dotenv = require('dotenv')
dotenv.config();
app.use(cors());
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({
    origin: '*',
    methods: 'GET, POST, PUT, DELETE, PATCH',
    allowedHeaders: 'Content-Type',
}));

app.use(express.static("public"))


let EmployeeLeaveRoute = require("./src/Router/EmployeeLeaveRoute.js")
let EmployeeRoute = require("./src/Router/EmployeeRoute.js")
let EmployeePositionRoute = require('./src/Router/EmployeePosition.js')
let LeaveRouter = require("./src/Router/LeaveRoute.js")
let PositionRouter=require('./src/Router/PositionRoute.js')


app.get('/', async (req, res) => {
    res.send("Server is Running clearly")
})

// app.post('/Position/getAnyInformation',async(req,res)=>{
//     res.send("mansoor is good boy")
// })


app.use('/EmployeeLeave', EmployeeLeaveRoute)
app.use('/Employee', EmployeeRoute)
app.use('/EmployeePosition', EmployeePositionRoute)
app.use('/Leave', LeaveRouter)
app.use('/Position',PositionRouter)



app.listen(5000);