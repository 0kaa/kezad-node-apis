require("dotenv").config();
const sql = require("mssql");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: 1433,
  options: {
    encrypt: false,
    enableArithAbort: true,
  },
};

const connectToDatabase = async () => {
  try {
    await sql.close(); // Close any existing connections before creating a new one
    await sql.connect(config);
    console.log("Database connected successfully!");
  } catch (err) {
    console.error("Database connection failed:", err);
  }
};

module.exports = { connectToDatabase, sql };
