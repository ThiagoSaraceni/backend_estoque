const mysql = require("mysql2/promise");

const db = mysql.createPool(process.env.CONNECTION_STRING);

db.getConnection()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

module.exports = db;
