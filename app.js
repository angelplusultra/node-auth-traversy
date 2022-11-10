//Module Imports
const path = require('path')
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db");
const morgan = require("morgan");
const router = require('./routes/index')
const exphbs = require("express-handlebars");


const PORT = process.env.PORT || 5000;
const app = express();

//ENV Configs
dotenv.config({ path: "./config/config.env" });


connectDB();

// HTTP Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}



//Handlebars
app.engine(".hbs", exphbs.engine({ defaultLayout: 'main', extname: ".hbs",}));
app.set("view engine", ".hbs");

app.use(express.static(path.join(__dirname, 'public')))
app.use('/', router)


//Server Porting
app.listen(PORT, () => {
  console.log(`...Listening to ${process.env.NODE_ENV} mode on port ${PORT}`);
});
