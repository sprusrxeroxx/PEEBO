import express from "express";
import dotenv from "dotenv";

dotenv.config()


const app = express();

app.listen(process.env.PO, () =>{
    console.log(`Server is running on Port ${PORT}`)
})
