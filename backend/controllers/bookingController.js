const { v4: uuidv4 } = require('uuid');
const db = require('../config/database');
const { generateTicketInfo, generateTicketImage } = require('../services/ticketService');

exports.bookEvent = (req, res) => {
    const { firstName, lastName, email, mobileNumber, user_id, event_id } = req.body;
    // Generate unique ticket ID
    const ticketId = uuidv4();

    // Insert booking
    const bookingSql = 'INSERT INTO bookings (user_id, event_id) VALUES (?, ?)';
    db.query(bookingSql, [user_id, event_id], (err, result) => {
        if (err) {
            console.error('Error booking event:', err);
            return res.status(500).send('Error booking event');
        }
        // Get the ID of the newly inserted booking
        const bookingId = result.insertId;

        // Insert booking details
        const detailsSql = 'INSERT INTO booking_details (booking_id, first_name, last_name, email, mobile_number, ticket_id) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(detailsSql, [bookingId, firstName, lastName, email, mobileNumber, ticketId], (err, result) => {
            if (err) {
                console.error('Error inserting booking details:', err);
                return res.status(500).send('Error inserting booking details');
            }
            // Return the ticket ID
            res.send({ ticketId });
        });
    });
};

exports.downloadTicket = async (req, res) => {
    const ticketId = req.params.ticketId;

    try {
        const ticketInfo = await generateTicketInfo(ticketId);
        if (!ticketInfo) {
            return res.status(404).send('Ticket not found');
        }

        const ticketImage = await generateTicketImage(ticketInfo);

        // Remove the data URL prefix to get the raw base64 string
        const base64Data = ticketImage.replace(/^data:image\/png;base64,/, '');

        // Convert base64 string to buffer
        const imgBuffer = Buffer.from(base64Data, 'base64');

        // Set response headers to indicate image content
        res.set('Content-Type', 'image/png');
        res.set('Content-Disposition', `attachment; filename="ticket_${ticketId}.png"`);

        // Send the image buffer as the response
        res.send(imgBuffer);
    } catch (error) {
        console.error('Error generating ticket:', error);
        return res.status(500).send('Internal Server Error');
    }
};