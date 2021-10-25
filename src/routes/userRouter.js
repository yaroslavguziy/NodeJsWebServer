const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController');

router.get('/me', UserController.getUser);
router.delete('/me', UserController.deleteUser);
router.patch('/me', UserController.changeUserPassword);

module.exports = router;
