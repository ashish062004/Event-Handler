const db = require('../config/database');

exports.createBooking = (booking, callback) => {
    const { user_id, event_id } = booking;
    const sql = 'INSERT INTO bookings (user_id, event_id) VALUES (?, ?)';
    db.query(sql, [user_id, event_id], callback);
};

exports.createBookingDetails = (bookingDetails, callback) => {
    const { booking_id, first_name, last_name, email, mobile_number, ticket_id } = bookingDetails;
    const sql = 'INSERT INTO booking_details (booking_id, first_name, last_name, email, mobile_number, ticket_id) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [booking_id, first_name, last_name, email, mobile_number, ticket_id], callback);
};