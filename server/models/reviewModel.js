const mongoose = require('mongoose');
const Product = require('./../models/productModel');

const reviewSchema = mongoose.Schema({
   user : {
      type : mongoose.Schema.ObjectId ,
      required : true ,
      ref : "User"
   },
   name : {
      type : String , 
      required : true 
   } ,
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
}, { 
   timestamps : true ,
   toJSON : { virtuals : true } ,
   toObject : { virtuals : true }
})

// stats 
reviewSchema.statics.calcAverageRating = async function (productId) {
   const stats = await this.aggregate([
      {
         $match : { product : productId}
      },
      {
         $group : {
            _id : '$product',
            nRating : { $sum : 1} ,
            avgRating : { $avg : '$rating'}
         }
      }
   ])
   if(stats.length > 0){
      await Product.findByIdAndUpdate(productId , {
         numReviews : stats[0].nRating ,
         rating : stats[0].avgRating
      })
   }else{
      await Product.findByIdAndUpdate(productId , {
         numReviews : 0 ,
         rating : 0 
      })
   } 
}

reviewSchema.post('save' , function() {
   this.constructor.calcAverageRating(this.product);
})

reviewSchema.pre(/^findOneAnd/ , async function(next) {
   this.cr = await this.findOne().clone();
   next()
})

reviewSchema.post(/^findOneAnd/ , async function() {
   await this.cr.constructor.calcAverageRating(this.cr.product);
})

const Review = mongoose.model('Review' , reviewSchema);
module.exports = Review ;