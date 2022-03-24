const router = require('express').Router();
const { protect, isAdmin } = require('./../middlewares/protect')
const orderController = require('./../controllers/orderController');

router.route('/')
   .post(protect , orderController.createOrder)
router.route('/ordersList')
   .get(protect , isAdmin , orderController.getAllOrders);
router.route('/myOrders')
   .get(protect , orderController.getMyOrders)
router.route('/:id')
   .get(protect , orderController.getSingleOrder)
   .put(protect , isAdmin , orderController.markDeliver);
router.route('/:id/pay')
   .put(protect , orderController.updateOrderToPay);

module.exports = router ;
