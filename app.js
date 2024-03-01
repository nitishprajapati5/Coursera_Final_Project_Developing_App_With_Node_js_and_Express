const express = require('express')
const dotenv = require("dotenv")
const db = require("./config/dbconnection");
const cors = require('cors')
const PORT = 3000;

//Models Section
const user = require('./models/user')
const book = require('./models/book')
const review = require('./models/review')

//Routes Section
const authRoutes = require('./routes/auth')


//Database Configuration File
dotenv.config();

//Start of Middleware
const app = express();
app.use(cors())
//Middleare
app.use(express.json())

//Routes with app use
const baseUrl = "/api/v1"
app.use(baseUrl,authRoutes);


//Database Connectivity Check

db.connectDatabase();

//Let's try to add in try-catch Block

try{
    const PORT = process.env.APP_PORT;
    app.listen(PORT, () => {
        console.log("Application Listening on Port " + PORT)
    });
}
catch(error){
    console.log(error);
}
