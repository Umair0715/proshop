const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const connectDB = require('./utils/db');
const globalErrorHandler = require('./middlewares/errorHandler');
const cors = require('cors');

// DATABASE 
connectDB();

app.use(cors());
// ROUTES
app.use('/api' , require('./routes/productRoutes'));

// ERROR HANDLER
app.use(globalErrorHandler);

// SERVER
const PORT = process.env.PORT || 2000;
app.listen(PORT , () => console.log(`server is running on port ${PORT}`));