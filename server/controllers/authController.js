const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const User = require('./../models/userModel');
const jwt = require("jsonwebtoken");

const generateToken = user => {
   return jwt.sign( { _id : user._id } , process.env.JWT_SECRET , {
      expiresIn : process.env.JWT_EXPIRES_IN
   })
}


exports.register = catchAsync(async ( req , res , next ) => {
   const { name , email , password , isAdmin} = req.body;
   if(!name || !email || !password){
      return next(new AppError('All fields are required' , 400))
   }
   const userExist = await User.findOne({ email });
   if(userExist){
      return next(new AppError('This Email is already taken.' , 400))
   }
   await User.create({
      name , email , password , 
      isAdmin : isAdmin ? isAdmin : false 
   })
   res.status(201).json({
      status : 'success' , 
      message : 'user registered successfully.'
   })

})

exports.login = catchAsync(async ( req , res , next ) => {
   const { password , email } = req.body;
   if(!password || !email){
      return next(new AppError('Email and Password is required.' , 400))
   }
   const user = await User.findOne({ email });
  
   if(!user){
      return next(new AppError('Email is not registered.' , 400))
   }
   const matchPassword = await user.comparePassword(password);
   if(!matchPassword){
      return next(new AppError('Wrong Email or Password.' , 400))
   }
   const token = generateToken(user);
   res.status(200).json({
      name : user.name ,
      email : user.email ,
      _id : user._id ,
      token ,
      isAdmin : user.isAdmin
   })
})


// GET: getProfile      =>       /api/user
exports.getProfile = catchAsync(async ( req , res , next ) => {
   const user = await User.findById(req.user._id);
   if(!user){
      return next(new AppError('You are not logged in please login to get access.' , 400))
   }
   res.status(200).json({
      status : 'success' ,
      name : user.name , 
      email : user.email , 
      _id : user._id ,  
   })
})

// PUT: updateProfile      =>       /api/user
exports.updateProfile = catchAsync(async ( req , res , next ) => {
   const user = await User.findById(req.user._id);
   if(!user){
      return next(new AppError('You are not logged in please login to get access.' , 400))
   }
   if(req.body.name) user.name = req.body.name
   if(req.body.email) user.email = req.body.email
   if(req.body.password) user.password = req.body.password

   const updatedUser = await user.save();
   const token = generateToken(updatedUser)
   res.status(200).json({
      status : 'success' ,
      message : 'Profile update successfully.', 
      name : updatedUser.name ,
      email : updatedUser.email ,
      _id : updatedUser._id ,
      isAdmin : updatedUser.isAdmin ,
      token
   })
});


// GET: ALL USERS      =>       /api/user/usersList
exports.getAllUsers = catchAsync(async ( req , res , next ) => {
   const users = await User.find();
   if(!users || users.length === 0){
      return next(new AppError('No user found yet.' , 400))
   }
   res.status(200).json({
      status : 'success' ,
      users
   })
})


// DELETE: DELETE USER      =>       /api/user/:id
exports.deleteUser = catchAsync(async ( req , res , next ) => {
   const user = await User.findById(req.params.id);
   if(!user){
      return next(new AppError('User not found.' , 404))
   }
   await user.remove();
   res.status(200).json({
      status : 'success' ,
      message : 'User removed successfully' 
   })
});


// GET: GET SINGLE USER      =>       /api/user/:id
exports.getSingleUser = catchAsync(async ( req , res , next ) => {
   const user = await User.findById(req.params.id);
   if(!user){
      return next(new AppError('User not found.', 404))
   }
   res.status(200).json({
      status: 'success' , 
      user 
   })
})

// PUT: UPDATE USER      =>       /api/user/:id
exports.updateUser = catchAsync(async ( req , res , next ) => {
   const user = await User.findById(req.params.id);
   if(!user){
      return next(new AppError('User not found.', 404))
   }
   if (req.body.name ) user.name = req.body.name;
   if (req.body.email ) user.email = req.body.email;
   if (req.body.isAdmin){
      user.isAdmin = true 
   }else{
      user.isAdmin = false;
   }
   
   const updatedUser = await user.save();
   
   res.status(200).json({
      status: 'success' , 
      user : updatedUser 
   })
})