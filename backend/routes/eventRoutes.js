const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { authenticateSession, authorizeRole } = require('../middleware/auth');

router.post('/create', eventController.createEvent);
router.get('/', eventController.listEvents);
router.get('/:id', eventController.getEventDetails);

module.exports = router;