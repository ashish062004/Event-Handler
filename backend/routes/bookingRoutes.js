const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/book', bookingController.bookEvent);
router.get('/download-ticket/:ticketId', bookingController.downloadTicket);

module.exports = router;