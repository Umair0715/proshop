const router = require('express').Router();
const productController = require('./../controllers/productController');
const { protect , isAdmin } = require('./../middlewares/protect');


router.route('/products').get(productController.getAllProducts);
router.route('/product')
   .post( protect , isAdmin , productController.createProduct)
router.route('/products/top')
   .get(productController.getTopProducts);
router.route('/product/:id')
   .get(productController.getSingleProduct)
   .delete(protect , isAdmin , productController.deleteProduct)
   .put( protect , isAdmin , productController.updateProduct)

module.exports = router;