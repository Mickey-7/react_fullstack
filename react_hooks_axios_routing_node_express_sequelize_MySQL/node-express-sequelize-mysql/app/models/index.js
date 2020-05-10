// invoke db.config.js
const dbConfig = require("../config/db.config.js");

//invoke sequelize
const Sequelize = require("sequelize");
// create sequelize with dbConfig configuration
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

//create db object
const db = {};

//invoke sequelize & Sequelize to db
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//invoking the tutorial.model.js file which we will create and will handle the fields for our database table
db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
//tutorials will be the database table name

//module export as db
module.exports = db;

// Don’t forget to call sync() method in server.js:
// const db = require("./app/models");
// db.sequelize.sync();
