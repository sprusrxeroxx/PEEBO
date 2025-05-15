import "dotenv/config.js";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRoutes from './routes/product.route.js';
import recipeRoutes from "./routes/recipe.route.js";
import userRoutes from "./routes/user.route.js";

const app = express();

// Security Middleware
app.use(helmet());

// CORS Middleware
app.use(cors({
    origin: process.env.NODE_ENV === "production"
    ? process.env.FRONTEND_URL
    : "http://localhost:5173",
    credentials: true,
}));

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/v1/products', productRoutes);
app.use("/api/v1/recipes", recipeRoutes);
app.use("/api/v1/users", userRoutes);

app.listen(PORT, (error) => {
    if (!error) { 
        console.log(`Server is running on Port ${PORT}`);
        connectDB();
    }
    else {
        console.log(`Something went wrong on the server`, error);
    }
});