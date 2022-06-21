// require express and path modules
const express = require("express");
const path = require("path");

const routes = require("./routes");

//declare the PORT
const PORT = process.env.PORT || 4000;

//create express app instance
const app = express();

//add relevant middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.use(routes);

//connect to the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
