const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
   user : {
      type : mongoose.Schema.ObjectId ,
      required : true ,
      ref : "User"
   },
   rating : {
      type : Number , 
      required : true 
   },
   review : {
      type : String , 
      required : true 
   },
   product : {
      type : mongoose.Schema.ObjectId ,
      required : true ,
      ref : 'Product'
   }
}, { timestamps : true })

const Review = mongoose.model('Review' , reviewSchema);
module.exports = Review ;