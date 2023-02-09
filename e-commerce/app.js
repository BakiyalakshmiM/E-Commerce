const express = require("express");
const app = express();
const { connectDB} = require('./db/connectDB')
const router = require('./route/productRoute');
const { notFound} = require('./middleware/notFound')
const { errorHandler} = require('./middleware/errorHandler')
require('dotenv').config();

app.use(connectDB);

app.use(express.json());

app.use('/products', router);

app.use('/', notFound);

app.use(errorHandler);

const start = async () => {
    try {
        let port = process.env.PORT || 3000;
        app.listen(port, () =>
          console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
  };
  
start();
