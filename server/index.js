import "dotenv/config.js";
import express from "express";
import { connectDB } from "./config/db.js";
import productRoutes from './routes/product.route.js'

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use('/api/v1/products', productRoutes )

app.listen(PORT, (error) => {
    if (!error) { 
        console.log(`Server is running on Port ${PORT}`);
        connectDB();
    }
    else {
        console.log(`Something went wrong on the server`, error)
    }
})