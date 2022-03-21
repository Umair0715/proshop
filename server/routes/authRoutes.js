const router = require("express").Router();
const { protect } = require("../middlewares/protect");
const authController = require('./../controllers/authController');


router.route('/register').post(authController.register);
router.route('/login').post(authController.login);

// USER 
router.route('/')
   .get(protect , authController.getProfile)
   .put(protect , authController.updateProfile)


module.exports = router;