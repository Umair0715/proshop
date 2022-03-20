const router = require('express').Router();
const productController = require('./../controllers/productController');


router.route('/products').get(productController.getAllProducts);
router.route('/product/:id').get(productController.getSingleProduct);


module.exports = router;