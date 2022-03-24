const router = require('express').Router();
const { protect  } = require('./../middlewares/protect');
const reviewController = require('./../controllers/reviewController');

router.route('/:id')
   .post(protect  , reviewController.createReview) 
   .delete(protect , reviewController.deleteReview);
router.route('/')
   .get(reviewController.getAllReviews);

module.exports = router;