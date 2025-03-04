import express from "express";
import 'dotenv/config.js';

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(process.env.PORT, (error) => {
    if (!error) { 
        console.log(`Server is running on Port ${PORT}`)
    }
    else {
        console.log(`Something went wrong on the server`, error)
    }
})

app.use('/', (req, res) => {
    res.status(200).send('Welcome to the Peebo store')
})
