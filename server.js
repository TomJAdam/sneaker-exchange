// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');

app.set("view engine", "ejs");
// PG database client / connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));


app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
    src: __dirname + "/styles",
    dest: __dirname + "/public/styles",
    debug: true,
    outputStyle: 'expanded'
}));
app.use(express.static("public"));


const dataHelpers = require('./lib/data_helpers')(db);

// Separated Routes for each Resource
// const usersRoutes = require("./routes/users")(dataHelpers);
// const widgetsRoutes = require("./routes/widgets"); //not done yet
const sneakersRoutes = require("./routes/sneakers")(dataHelpers);

// Mount all resource routes
app.use('/api/sneakers', sneakersRoutes);
// app.use("/api/widgets", widgetsRoutes(db));



// Note: mount other resources here, using the same pattern above
const userRoutes = require('./routes/users')(dataHelpers);
app.use('/user', userRoutes);
// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
// app.get("/", (req, res) => {
//     res.render("index");
// });

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});

// const users = {};
// function generateRandomString(bod) {
//   //function to generate random numbers
//   return Math.random().toString(20).substr(2, 6);
// }

// app.post("/register", (req, res) => {
//   //user makes a new userid and password
//   let newEmail = req.body.email;
//   let newPass = req.body.password;
//   console.log("email: ", newEmail);
//   console.log("password:",newPass)

//   if (newEmail === "" && newPass === "") {

//     res.sendStatus(404);
//   } else {

//     const hashedPassword = bcrypt.hashSync(newPass, 10);
//     const newID = generateRandomString();
//     console.log("newID is", newID);
//     users[]
//     res.redirect("/")
//   }
// });


app.post('/login', (req, res) => {
 const {email, password} = req.body;
 console.log("email: ", email);
 console.log("pass: ", password);
 res.redirect('/');

});

