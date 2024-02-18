const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require('cors');
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");

//import routes
const authRoutes = require('./routes/authRoute');

//database connection
mongoose.connect(process.env.DATABASE, {
 }).then(()=>console.log("Database Connected"))
.catch((err)=>console.log(err));

//Middleware

app.use(morgan('dev'));
app.use(bodyParser.json({limit: "5mb"}));
app.use(bodyParser.urlencoded({
    limit: "5mb",
    extended: true
}));
app.use(cookieParser());
app.use(cors());

app.use('/api', authRoutes);

//error middleware
app.use(errorHandler);

//port
 const port = process.env.PORT 

 app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
 });
