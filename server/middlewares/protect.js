const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');


exports.protect = catchAsync(async ( req , res , next ) => {
   let token ;
   if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
      token = req.headers.authorization.split(' ')[1];
   }
   if(!token){
      return next(new AppError('You are not logged in. please login to get access' , 401))
   }
   const decoded = jwt.verify(token , process.env.JWT_SECRET);
   const user = await User.findById(decoded._id);
   if(!user){
      return next(new AppError('unAuthorized Access.' , 401))
   }
   req.user = user;
   next();
})


exports.isAdmin = catchAsync(async ( req , res , next ) => {
   if(req.user && req.user.isAdmin){
      return next();
   }
   return next(new AppError('Your are not allowed to perform this action.', 400))
})
