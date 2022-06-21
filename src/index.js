require("dotenv").config();

// require express and path modules
const express = require("express");
const path = require("path");
const mysql2 = require("mysql2/promise");
const dbMiddleware = require("./middleware/db");
const routes = require("./routes");

const init = async () => {
  try {
    //declare the PORT
    const PORT = process.env.PORT || 4000;

    //prepare sql config
    const dbConfig = {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    };

    //connect to sql database
    const db = await mysql2.createConnection(dbConfig);

    //create express app instance
    const app = express();

    //add relevant middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, "../public")));
    app.use(dbMiddleware(db));
    app.use(routes);

    //connect to the server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`[ERROR]: Failed to start server | ${error.message}`);
  }
};

init();
