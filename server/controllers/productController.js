const catchAsync = require('./../utils/catchAsync');
const Product = require('./../models/productModel');
const AppError = require('./../utils/appError');

// POST::CREATE PRODUCTS    =>    /api/product
exports.createProduct = catchAsync( async ( req , res , next) => {
   const newProduct = await Product.create({
      user : req.user._id ,
      name : 'sample product',
      image : '/image/sample.jpg',
      price : 00,
      category : 'sample category',
      brand : 'sample brand' ,
      description : 'sample description' ,
      countInStock : 0
   });
   res.status(201).json({
      status : 'success' ,
      product : newProduct 
   })
});

// POST::UPDATE PRODUCTS    =>    /api/product/:id
exports.updateProduct = catchAsync( async ( req , res , next) => {
   const product = await Product.findById(req.params.id);
   if(!product){
      return next(new AppError('Product not fount.' , 404))
   }
   const updatedProduct = await Product.findByIdAndUpdate(req.params.id , req.body ,{ 
      new : true , runValidators : true 
   })

   res.status(201).json({
      status : 'success' ,
      product : updatedProduct  
   })
});


// GET::ALL PRODUCTS    =>    /api/products
exports.getAllProducts = catchAsync( async ( req , res , next ) => {

   const keyword = req.query.keyword ? {
      name : {
         $regex : req.query.keyword ,
         $options : 'i'
      }
   } : {}

   const products = await Product.find({ ...keyword });
   if(!products || products.length === 0){
      return next(new AppError('No Product found' , 404));
   }
   res.status(200).json({
      status : 'success' ,
      results : products.length ,
      products 
   })
});


// GET::SINGLE PRODUCT    =>    /api/product/:id
exports.getSingleProduct = catchAsync( async (req ,res , next) => {
   const product = await Product.findById(req.params.id).populate('reviews');
   if(!product){
      return next(new AppError('Product not found' , 404))
   }
   res.status(200).json({
      status : 'success' ,
      product 
   })
})


// DELETE::DELETE PRODUCT    =>    /api/product/:id
exports.deleteProduct = catchAsync( async (req ,res , next) => {
   const product = await Product.findById(req.params.id);
   if(!product){
      return next(new AppError('Product not found' , 404))
   }
   await product.remove();
   res.status(200).json({
      status : 'success' ,
      message : 'Product removed successfully '
   })
})



