// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");
var helpers = require('handlebars-helpers')();
hbs.registerHelper('eq', helpers.eq);
const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const projectName = "towning";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

const authRoutes = require("./routes/auth");
app.use("/", authRoutes);

const profileRoutes = require("./routes/profile");
app.use("/", profileRoutes);

const experienceRoutes = require("./routes/experience");
app.use("/", experienceRoutes);

const aboutRoutes = require("./routes/about");
app.use("/", aboutRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

// ❗ Set user data after login in local session
app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
    });

module.exports = app;
