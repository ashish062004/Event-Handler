const express = require('express');
const router = express.Router();
const sponsorController = require('../controllers/sponsorController');
const { authenticateSession, authorizeRole } = require('../middleware/auth');

router.post('/submit', authenticateSession, authorizeRole('sponsor'), sponsorController.submitSponsorship);

module.exports = router;