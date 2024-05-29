const db = require('../config/database');
const { createCanvas } = require('canvas');

const generateTicketInfo = async (ticketId) => {
    console.log("Ticket ID:", ticketId); // Log ticketId for debugging

    const query = `
        SELECT bd.id AS booking_detail_id, 
               bd.ticket_id AS ticket_id,
               b.id AS booking_id, 
               e.title AS event_name, 
               e.date AS event_date, 
               e.address AS venue, 
               bd.first_name, 
               bd.last_name, 
               bd.email, 
               bd.mobile_number 
        FROM booking_details bd 
        JOIN bookings b ON bd.booking_id = b.id 
        JOIN events e ON b.event_id = e.id 
        WHERE bd.ticket_id = ?;
    `;

    try {
        const result = await new Promise((resolve, reject) => {
            db.query(query, [ticketId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        console.log("Query Result:", result); // Log query result for debugging

        if (result.length === 0) {
            return null;
        }

        const ticketInfo = {
            ticketId: result[0].ticket_id,
            bookingDetailId: result[0].booking_detail_id,
            eventName: result[0].event_name,
            eventDate: result[0].event_date,
            venue: result[0].venue,
            firstName: result[0].first_name,
            lastName: result[0].last_name,
            email: result[0].email,
            mobileNumber: result[0].mobile_number
            // Add more ticket information as needed
        };

        return ticketInfo;
    } catch (err) {
        console.error('Error retrieving ticket information:', err);
        return null;
    }
};

const generateTicketImage = async (ticketInfo) => {
    const canvas = createCanvas(700, 200);
    const ctx = canvas.getContext('2d');

    // Fill the background with white color
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set text properties
    ctx.fillStyle = 'black';
    ctx.font = 'bold 20px Arial';

    // Draw the ticket information
    ctx.fillText('Ticket ID: ' + ticketInfo.ticketId, 20, 40);
    ctx.fillText('Event Name: ' + ticketInfo.eventName, 20, 80);
    ctx.fillText('Date: ' + ticketInfo.eventDate, 20, 120);
    ctx.fillText('Venue: ' + ticketInfo.venue, 20, 160);

    // Return the canvas as a base64 encoded PNG image
    return canvas.toDataURL('image/png');
};

module.exports = { generateTicketInfo, generateTicketImage };