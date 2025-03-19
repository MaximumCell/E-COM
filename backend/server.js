import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
import path from 'path';

dotenv.config();  // Load .env before using MONGO_URI
connectDB();  // Connect to MongoDB

const app = express();

app.use(express.json()); // Parse JSON bodies

const __dirname = path.resolve();  // Get the current directory

app.use('/api/products', productRoutes);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend" , "dist", "index.html"));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Server started on http://localhost: '+ PORT);
});

