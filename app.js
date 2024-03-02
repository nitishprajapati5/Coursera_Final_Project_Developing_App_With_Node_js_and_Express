const express = require('express')
const dotenv = require("dotenv")
const db = require("./config/dbconnection");
const cors = require('cors')
const status404Handler = require('./middleware/404ErrorHandler')
const PORT = 3000;

//Models Section
const user = require('./models/userDTO')
const book = require('./models/booksDTO')
const bookReview = require('./models/bookReviewDTO')

//Routes Section
const authRoutes = require('./routes/authRouter')
const booksRoutes = require('./routes/bookRouter')
const reviewRoutes = require('./routes/reviewRouter')
//Database Configuration File
dotenv.config();

//Start of Middleware
const app = express();
app.use(cors())
//Middleare
app.use(express.json())

//Routes with app use
const baseUrl = "/api/"
app.use(baseUrl,authRoutes);
app.use(baseUrl,booksRoutes)
app.use(baseUrl,reviewRoutes)


//error Handler
app.use(status404Handler)
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
