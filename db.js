require("dotenv").config();
const { Connection, Request } = require("tedious");

const config = {
  server: process.env.DB_HOST,
  authentication: {
    type: "default",
    options: {
      userName: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
  },
  options: {
    database: process.env.DB_NAME,
    encrypt: false,
    port: 1433,
    enableArithAbort: true,
    requestTimeout: 30000, // 30 second
  },
};

const connectToDatabase = () => {
  return new Promise((resolve, reject) => {
    const connection = new Connection(config);

    connection.on("connect", (err) => {
      if (err) {
        console.error("Database connection failed:", err);
        reject(err);
      } else {
        console.log("Database connected successfully!");
        resolve(connection);
      }
    });

    connection.connect();
  });
};

module.exports = { connectToDatabase, Request };
