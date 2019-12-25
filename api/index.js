const express = require("express");
const bodyParser = require("body-parser");

// Create express instnace
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import API Routes
app.use(require("./routes/todo"));

// Export the server middleware
module.exports = {
  path: "/api",
  handler: app
};
