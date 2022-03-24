const path = require('path')
const multer = require('multer');
const AppError = require('./../utils/appError');
const router = require('express').Router();

const storage = multer.diskStorage({
   destination : function(req , file , cb){
      cb(null , 'uploads/')
   },
   filename : function(req , file , cb){
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
   }
});

const multerFilter = (req , file , cb) => {
   if(file.mimetype.startsWith('image')){
      return cb(null , true )  
   }
   return cb(new AppError('not an image. You can upload only images', 400))
}

const upload = multer({
   storage , 
   fileFilter : multerFilter
})

router.post('/upload' , upload.single('image') , ( req , res ) => {
   res.status(200).send(`/${req.file.path}`)
})


module.exports = router ;