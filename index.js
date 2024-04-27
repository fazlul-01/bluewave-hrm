const authJwt = require("./config/authJwt");
const express = require("express");
const db = require("./models");
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
  res.json({ message: "Welcome to hrms-employee " });
});

const routes = require("./src/routes/index"); // Adjust the path to your index file

// Pass the router to the routes defined in the index file
routes(router);
app.use("/api", router);

const port = process.env.PORT || 4000;

// db.sequelize.sync({ force: true }).then(async () => {
//   console.log("Drop and re-sync db.");
// });
// require("./src/routes/student")(app);
app.listen({ port: port }, () => {
  console.log(`Server ready at http://localhost:${port}.`);
});
