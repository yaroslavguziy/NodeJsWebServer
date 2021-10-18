const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/me', userController.getUser);
router.delete('/me', userController.deleteUser);
router.patch('/me', userController.changeUserPassword);

module.exports = router;
