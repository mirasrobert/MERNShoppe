import express from 'express';
import connectDB from './database/database.js';
import dotenv from 'dotenv';
import cors from 'cors';
import { notFound, errorHandler } from './middleware/errors.js';
import colors from 'colors'; // Make our console have colors

import productRoutes from './routes/productRoutes.js';

const app = express();

app.use(cors());

dotenv.config(); // Use .env

connectDB(); // Connect to Database

app.get('/', (req, res) => {
  res.send('Server Running');
});

// Define API Routes
app.use('/api/products', productRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`.yellow.bold
  )
);
