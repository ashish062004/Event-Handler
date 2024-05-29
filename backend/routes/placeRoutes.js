const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateSession, authorizeRole } = require('../middleware/auth');

router.get('/profile/:userId', userController.getUserProfile);
router.get('/', authenticateSession, authorizeRole('admin'), userController.listUsers);
router.get('/:role', authenticateSession, authorizeRole('admin'), userController.listUsersByRole);
router.put('/:id', authenticateSession, authorizeRole('admin'), userController.updateUser);

module.exports = router;