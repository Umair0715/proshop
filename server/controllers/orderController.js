const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Order = require('./../models/orderModel');

exports.createOrder = catchAsync(async ( req , res , next ) => {
   
   const { orderItems , shippingInfo , taxPrice , shippingPrice , itemsPrice , totalPrice , paymentMethod} = req.body;
   if(!orderItems || !shippingInfo || !taxPrice || !shippingPrice || !itemsPrice || !totalPrice || !paymentMethod ){
      return next(new AppError('Missing required credentials' , 400))
   }
   const newOrder = await Order.create({ 
      user : req.user._id ,
      orderItems , 
      shippingInfo , 
      taxPrice ,
      totalPrice ,
      itemsPrice ,
      shippingPrice ,
      paymentMethod
   })
   res.status(201).json({
      status : 'success' ,
      order : newOrder
   })
});


exports.getSingleOrder = catchAsync(async ( req , res , next ) => {
   const order = await Order.findById(req.params.id).populate({
      path : 'user' , 
      select : 'name email _id'
   }).populate({
      path : 'orderItems',
      populate: {
         path : 'product' ,
         select : 'name image price countInStock'
      }
   });
   if(!order){
      return next(new AppError('Order not found.', 404))
   }
   res.status(200).json({
      status : 'success' ,
      order 
   })
})


exports.updateOrderToPay = catchAsync(async ( req , res , next ) => {
   const order = await Order.findById(req.params.id);
   if(!order){
      return next(new AppError('order not fount' , 404))
   }
   order.isPaid = true ;
   order.paidAt = Date.now();
   order.paymentResult = {
      id : req.body.id ,
      status : req.body.status ,
      update_time : req.body.update_time ,
      email_adress : req.body.payer.email_adress ,
   }
   const updatedOrder = await order.save();
   res.status(200).json({
      status : 'success' ,
      order : updatedOrder
   })
})


exports.getMyOrders = catchAsync(async ( req , res , next ) => {
   const orders = await Order.find({ user : req.user._id});
   if(!orders){
      return next(new AppError('No Order found.' , 404))
   }
   res.status(200).json({
      status : 'success' ,
      orders 
   })
})