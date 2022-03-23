const router = require("express").Router();
const { protect , isAdmin } = require("../middlewares/protect");
const authController = require('./../controllers/authController');


router.route('/register').post(authController.register);
router.route('/login').post(authController.login);

// USER 
router.route('/')
   .get(protect , authController.getProfile)
   .put(protect , authController.updateProfile)
router.route('/usersList')
   .get(protect , isAdmin , authController.getAllUsers);
router.route('/:id')
   .delete(protect , isAdmin , authController.deleteUser)
   .get(protect , isAdmin , authController.getSingleUser)
   .put(protect , isAdmin , authController.updateUser)


module.exports = router;