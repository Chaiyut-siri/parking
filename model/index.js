const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  logging: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci', 
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.parking = require("./parking.model.js")(sequelize, Sequelize);

module.exports = db;