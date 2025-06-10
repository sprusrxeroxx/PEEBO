import "dotenv/config.js";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRoutes from './routes/product.route.js';
import recipeRoutes from "./routes/recipe.route.js";
import userRoutes from "./routes/user.route.js";
import compression from "compression";

const app = express();

// Security Middleware
app.use(helmet({
  crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" }
}));

// Compression Middleware
app.use(compression());

// CORS Middleware
app.use(cors({
  origin: function(origin, callback) {
    const allowedOrigins = [
      'https://peebo.vercel.app',      // Main production URL
      'https://peebo-rhpg.vercel.app',         // Local development
      'http://localhost:5173'          // Alternative local port
    ];
    
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    
    // Check if the origin is allowed
    if (allowedOrigins.indexOf(origin) === -1) {
      // If origin contains vercel.app (for preview deployments)
      if (origin.includes('vercel.app') || origin.includes('localhost')) {
        return callback(null, true);
      }
      
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
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