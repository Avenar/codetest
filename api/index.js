// Initial imports from node packages
import express from "express";
import fs from "fs";
const app = express();

// Importing my own helpers
const { db } = await import("./database/mock.mjs");
const { config } = await import("./config/default.mjs");

// Add body parser so API can handle data inputs
app.use(express.json());

// Add headers and debugging to my api
app.use(function (req, res, next) {
  console.log(`${req.method} -> ${req.originalUrl}`);
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, PUT, POST, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Referer, content-type"
  );
  next();
});

// Declare root route for outside sources to verify that API is still running.
app.get('/', (req, res) => {
  res.send("You found me! I'm the API!");
});

// Load all routes from all my controllers
fs.readdir("./api/controllers", async (err, items) => {
  for (const file of items) {
    console.log(`Importing routes from ${file}`);
    try {
      const route = await import(`./controllers/${file}`);
      route.default(app, db);
    } catch (err) {
      console.error(err);
    }
  }
});

// Start listen loop
app.listen(config.port, () => {
  console.log(`Codetest listening on port ${config.port}`)
});