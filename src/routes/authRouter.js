const express = require('express');
const router = express.Router();

const { signIn, registration } = require('../controllers/authController');

router.post('/auth/register', registration);
router.post('/auth/login', signIn);

module.exports = router;
