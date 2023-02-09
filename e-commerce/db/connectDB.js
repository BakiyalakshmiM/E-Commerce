const mongoose = require("mongoose");
require('dotenv').config();
require("express-async-errors")

const connectDB = (req, res, next) => {
        mongoose.connect(process.env.MONGO_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        .then(() => {
            console.log("Connected to DB successfully")
            next();
        })
        .catch((err)=>{
            throw new Error("Error in connecting Database");
        })
    }

module.exports = {
    connectDB
}