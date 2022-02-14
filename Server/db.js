const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "usbw",
  database: "Gartenbot",
});

module.exports = db;
