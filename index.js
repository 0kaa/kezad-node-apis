var Connection = require("tedious").Connection;
var config = {
  server: "192.168.10.249\\sqlsymon", //update me
  authentication: {
    type: "default",
    options: {
      userName: "sa", //update me
      password: "skr0wteN.GMR", //update me
    },
  },
  options: {
    // If you are on Microsoft Azure, you need encryption:
    encrypt: false,
    database: "SymonData", //update me
    requestTimeout: 30000, // 30 second
  },
};
var connection = new Connection(config);
connection.on("end", function () {
  console.log("Connection ended");
});
connection.on("connect", function (err) {
  // If no error, then good to proceed.
  console.log("Connected");
  // setTimeout(() => {
  //   executeStatement();
  // }, 100);
});

connection.connect();

var Request = require("tedious").Request;
var TYPES = require("tedious").TYPES;

function executeStatement() {
  var request = new Request(
    "Update KizadLayout set ActiveLayout='MAhmoud' where ScreenName='CustomerTestimonials';",
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  );

  request.on("done", function (rowCount, more) {
    console.log(rowCount + " rows returned");
  });

  // Close the connection after the final event emitted by the request, after the callback passes
  request.on("requestCompleted", function (rowCount, more) {
    connection.close();
  });
  connection.execSql(request);
}
