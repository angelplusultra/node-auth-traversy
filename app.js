//Module Imports
const path = require('path')
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const morgan = require("morgan");
const indexRoutes = require('./routes/index')
const authRoutes = require('./routes/auth')
const exphbs = require("express-handlebars");
const passport = require('passport')
const session = require('express-session')

//Port config
const PORT = process.env.PORT || 5000;

//Express instance
const app = express();

//ENV Configs
dotenv.config({ path: "./config/config.env" });

// Passport config (IIFE only works with semicolon )
require('./config/passport');(passport)
connectDB();

// HTTP Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}



//Handlebars
app.engine(".hbs", exphbs.engine({ defaultLayout: 'main', extname: ".hbs",}));
app.set("view engine", ".hbs");

// Sessions 
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }))
//Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', indexRoutes)
app.use('/auth', authRoutes)


//Server Porting
app.listen(PORT, () => {
  console.log(`...Listening to ${process.env.NODE_ENV} mode on port ${PORT}`);
});
