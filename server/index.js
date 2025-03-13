import "dotenv/config.js";
import express from "express";
import { connectDB } from "./config/db.js";

const app = express();

const PORT = process.env.PORT;

app.listen(PORT, (error) => {
    if (!error) { 
        console.log(`Server is running on Port ${PORT}`);
        connectDB();
    }
    else {
        console.log(`Something went wrong on the server`, error)
    }
})

app.get('/products', (req, res) => {
    res.status(200).send('Welcome to the Peebo store')
})
