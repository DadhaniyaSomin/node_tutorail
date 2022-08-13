const express = require('express');
const router = express.Router();
const authUser = require('../../controllers/authController');

router.route('/').post(authUser.handleLogin);
module.exports = router;