//Config for mySQL Connection
const mysql = require("mysql");
const db = mysql.createConnection({
  host:"192.168.93.73",
  user: "azubi3",
  password: "ENERCON_01",
  database: "gartenbot",
  port    :'3306',
});

module.exports = db;
