import express from 'express';
import connectDB from './database/database.js';
import dotenv from 'dotenv';
import cors from 'cors';
import { notFound, errorHandler } from './middleware/errors.js';
import colors from 'colors'; // Make our console have colors
import passport from 'passport';
import passportConfig from './middleware/passport-jwt.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(cors());

dotenv.config(); // Use .env

connectDB(); // Connect to Database

// Pass the global passport object into the configuration function
passportConfig(passport);

// This will initialize the passport object on every request
app.use(passport.initialize());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server Running');
});

// Define API Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`.yellow.bold
  )
);
