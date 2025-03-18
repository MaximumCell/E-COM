import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';

dotenv.config();  // Load .env before using MONGO_URI
connectDB();  // Connect to MongoDB

const app = express();

app.use(express.json()); // Parse JSON bodies

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Server started on http://localhost: '+ PORT);
});

