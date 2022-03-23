const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
   user : {
      type : mongoose.Schema.ObjectId , 
      required : true ,
      ref : 'User'
   },
   orderItems : [
      {
         product : {
            type : mongoose.Schema.ObjectId ,
            required : true ,
            ref : 'Product'
         },
         qty : {
            type : Number ,
            required : true 
         },
      }
   ] ,
   shippingInfo : {
      address : { 
         type : String ,
         required : true 
      },
      city : { 
         type : String ,
         required : true 
      },
      postalCode : { 
         type : String ,
         required : true 
      },
      country : { 
         type : String ,
         required : true 
      },
   } ,
   paymentMethod : {
      type : String ,
      required : true 
   },
   paymentResult : {
      id : { type : String  },
      status : { type : String  },
      update_time : { type : String  } ,
      email_adress : { type : String  }
   },
   itemsPrice : {
      type : Number , 
      required: true , 
   },
   taxPrice : { 
      type : Number , 
      required : true ,
      default : 0.00
   },
   shippingPrice : { 
      type : Number , 
      required : true ,
      default : 0.00
   },
   totalPrice : { 
      type : Number , 
      required : true ,
      default : 0.00
   },
   isPaid : { 
      type : Boolean , 
      required : true ,
      default : false 
   },
   paidAt : Date ,
   isDelivered : { type : Boolean , required : true , default : false } ,
   deliveredAt : Date 
} , { timestamps : true })

const Order = mongoose.model('Order' , orderSchema);
module.exports = Order;