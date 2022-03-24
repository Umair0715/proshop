const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Review = require('./../models/reviewModel');

exports.createReview = catchAsync (async (req ,res , next) => {
   const reviewExist = await Review.findOne({ product : req.params.id , user : req.user._id });
   if(reviewExist){
      const updatedReview = await Review.findOneAndUpdate({ product : req.params.id} , req.body , {
         new : true , 
         runValidators : true
      })
      res.status(200).json({
         status : 'success' ,
         review : updatedReview
      })
   }else{
      const { review , rating } = req.body;
      if(!review || !rating ){
         return next(new AppError('Missing required credentials'));
      }
      const newReview = await Review.create({ 
         user : req.user._id , 
         product : req.params.id ,
         name : req.user.name ,
         review ,
         rating ,
      });
      res.status(201).json({
         status : 'success' ,
         review : newReview
      })
   }
})

exports.deleteReview =catchAsync(async ( req , res , next ) => {
   const review = await Review.findById(req.params.id);
   if(!review){
      return next(new AppError('Review Does not exist', 404));
   }
   if(review.user.toString() !== req.user._id.toString()){
      return next(new AppError('Review can delete only who create', 400))
   }
   await Review.findByIdAndDelete(req.params.id);
   res.status(200).json({
      status : 'success' ,
      message : 'Review deleted successfully'
   })
})

exports.getAllReviews = catchAsync (async ( req , res , next ) => {
   const reviews = await Review.find();
   res.status(200).json({
      status : 'success' ,
      results : reviews.length ,
      reviews
   })
})