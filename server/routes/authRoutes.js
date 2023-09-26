const { Router } = require('express');
const SignUp = require('../controllers/SignUp');
const login = require('../controllers/login');
const auth = require('../controllers/auth');

const router = Router();


router.post("/signup", SignUp)
router.post("/login", login)
router.post("/auth",auth)


module.exports = router;

