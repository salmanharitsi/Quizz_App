const express = require("express");
const router = express.Router();
const {signup, signin, logout, auth, highscore } = require("../controllers/authController");

//user routes

router.post('/user/signup', signup);
router.post('/user/signin', signin);
router.post('/user/auth', auth);

//high order
router.post('/user/highscore', highscore)

module.exports = router;