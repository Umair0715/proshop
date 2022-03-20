const catchAsync = require('./../utils/catchAsync');
const Product = require('./../models/productModel');
const AppError = require('./../utils/appError');


// GET::ALL PRODUCTS    =>    /api/products
exports.getAllProducts = catchAsync(async ( req , res , next ) => {
   const products = await Product.find();
   if(!products){
      return next(new AppError('Products not found' , 404));
   }
   res.status(200).json({
      status : 'success' ,
      results : products.length ,
      products 
   })
});


// GET::SINGLE PRODUCT    =>    /api/product/:id
exports.getSingleProduct = catchAsync(async (req ,res , next) => {
   const product = await Product.findById(req.params.id);
   if(!product){
      return next(new AppError('Product not found' , 404))
   }
   res.status(200).json({
      status : 'success' ,
      product 
   })
})


