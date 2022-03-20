const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
   name : {
      type : String , 
      required : true 
   },
   user : {
      type : mongoose.Schema.ObjectId , 
      required : true ,
      ref : 'User'
   },
   image : {
      type : String , 
      required : true 
   },
   brand : {
      type : String , 
      required : true   
   },
   category : {
      type : String , 
      required : true   
   },
   description : {
      type : String , 
      required : true   
   },
   rating : {
      type : Number , 
      required : true ,
      default : 0   
   },
   countInStock : {
      type : Number , 
      required : true ,
   },
   numReviews : {
      type : Number , 
      required : true ,
      default : 0   
   },
   price : {
      type : String ,
      required : true 
   }
} ,  { timestamps : true })

const Product = mongoose.model("Product" , productSchema);
module.exports = Product ;