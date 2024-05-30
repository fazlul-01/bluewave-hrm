//const authJwt = require("./config/authJwt");
const express = require("express");
//const db = require("./models");
const cors = require("cors");
const http = require("http");
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const router = express.Router();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(
  cors({
    credentials: true,
  })
);
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Work in progress" });
});

const routes = require("./src/routes/index"); // Adjust the path to your index file
const HTTP_PORT = process.env.HTTP_PORT || 5000;


const myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
};


//app.use(myLogger);
// Pass the router to the routes defined in the index file
routes(router);
//app.use(router);
app.use("/api", router);

//require("./src/routes/employee")(app);

app.listen(HTTP_PORT, () => {
  console.log(`Server ready at http://localhost:${HTTP_PORT}.`);
});

//require("dotenv").config();
//const db = require("./models");
let data = require("./constants/data");


/*

db.sequelize.sync({ force: true }).then(async () => {

  //await data.populateTables(db);

  console.log("Sync operation successful.");
});
*/
const syncDB = ()=>{
  console.log('sys');
}

/*
const getReportTo = async (db, empId) => {
  const results = [];
  let priority = 1;
  let managerId = null;
  while (true) {
    const employee = await db.employee.findByPk(empId);
    if (employee === null) {
      break;
    }
    const data = {};
    if (!employee.managerId) {
      // current employee has no manager
      if (results.length === 0) {
        // employee is the chief executive
        data.managerId = null;
        data.priority = null;
        results.push(data);
      }
      break;
    }
    data.managerId = employee.managerId;
    data.priority = priority;
    results.push(data);
    empId = employee.managerId;
    managerId = employee.managerId;
    priority++;
  }
  return results;
};*/
