const express = require("express");
const router = express.Router();
const User = require("../model/user");
const { signupController, signinController, getUser } = require("../controller/userController");
const { checkForAuthenticationCookie } = require("../middleware/Authentication");

//signup.................
router.post('/signup' ,signupController);
//signin.............
router.post('/signin' ,signinController);
router.get('/profile', checkForAuthenticationCookie(), getUser)


module.exports = router;
