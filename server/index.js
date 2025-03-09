import "dotenv/config.js";
import express from "express";
import mongoose from "mongoose";

const app = express();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI);

app.listen(PORT, (error) => {
    if (!error) { 
        console.log(`Server is running on Port ${PORT}`);
        console.log(`Successfully ${MONGO_URI}`)
    }
    else {
        console.log(`Something went wrong on the server`, error)
    }
})

app.use('/', (req, res) => {
    res.status(200).send('Welcome to the Peebo store')
})
