const router = require('express').Router();
const { protect } = require('./../middlewares/protect')
const orderController = require('./../controllers/orderController');

router.route('/')
   .post(protect , orderController.createOrder)
router.route('/myOrders')
   .get(protect , orderController.getMyOrders)
router.route('/:id')
   .get(protect , orderController.getSingleOrder)
router.route('/:id/pay')
   .put(protect , orderController.updateOrderToPay);

module.exports = router ;
