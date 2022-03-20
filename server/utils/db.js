const mongoose = require('mongoose');

const DB = process.env.DATABASE_REMOTE;
const connectDB = () => {
   mongoose.connect(DB , {
      useUnifiedTopology : true ,
      useNewUrlParser : true 
   }).then(() => console.log('Database connected.'))
   .catch(err => console.log(err))
}

module.exports = connectDB;