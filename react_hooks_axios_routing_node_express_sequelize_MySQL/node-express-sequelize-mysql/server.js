// invoke modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// -----------------------------------------------------------------
// added when models/index.js was created
//invoking the export module db  from
// models/index.js and calling sync() method
const db = require("./app/models");
db.sequelize.sync();
// In development, you may need to drop existing tables and re-sync database.
// Just use force: true as following code:
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});
// -----------------------------------------------------------------

// invoke express to our app variable
const app = express();

// declaring url frontend default if react app
// and using the cors module
var corsOptions = {
  origin: "http://localhost:3000",
};
//invoking the url cors to our app
app.use(cors(corsOptions));

// invoking bodyParser for content-type - application/json to our app
app.use(bodyParser.json());
// invoking bodyParser for content-type - application/x-www-form-urlencoded to our app
app.use(bodyParser.urlencoded({ extended: true }));

// define simple get method for test on web browser
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to backend",
  });
});

// -----------------------------------------------------------------
// added after routing/tutorial.route.js was created
//invoking the export module app from routing to our app
require("./app/routing/tutorial.route.js")(app);
// -----------------------------------------------------------------

// set prompt, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is runnong on port ${PORT}`);
});

// terminal output :
//     C:\Users\donat\Documents\react_hooks_axios_routing_node_express_sequelize_MySQL\node-express-sequelize-mysql>node server
//     Server is runnong on port 8080
// web browser output :
//     {"message":"Welcome to backend"}
