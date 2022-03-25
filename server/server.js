const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const connectDB = require('./utils/db');
const globalErrorHandler = require('./middlewares/errorHandler');
const cors = require('cors');
const path = require('path');

// DATABASE 
connectDB();

app.use(cors());
app.use(express.json());
app.use('/uploads' , express.static(path.join(__dirname , '../uploads')));
// ROUTES
app.use('/api' , require('./routes/productRoutes'));
app.use('/api' , require('./routes/uploadRoutes'));
app.use('/api/review', require('./routes/reviewRoutes'));
app.use('/api/user' , require('./routes/authRoutes'));
app.use('/api/order' , require('./routes/orderRoutes'));

app.use('/api/paypal/config' , (req ,res) => {
   res.json({
      clientId : process.env.PAYPAL_CLIENT_ID
   })
})

if(process.env.NODE_ENV === 'production'){
   app.use(express.static(path.join(__dirname , '../client/build')))

   app.get('*' , (req ,res ) => {
      res.sendFile(path.resolve(__dirname , '../client' , 'build' , 'index.html'))
   })
}

// ERROR HANDLER
app.use(globalErrorHandler);

// SERVER
const PORT = process.env.PORT || 2000;
app.listen(PORT , () => console.log(`server is running on port ${PORT}`));