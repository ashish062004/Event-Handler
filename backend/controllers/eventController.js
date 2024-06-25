const db = require('../config/database');

exports.createEvent = (req, res) => {
    const { title, description, date, time, organizer_id, eventType, duration, address, sponsorName, ticketPrice } = req.body;
    const sql = 'INSERT INTO events (title, description, date, organizer_id, event_type, duration, address, sponsor_name, time, ticketPrice) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [title, description, date, organizer_id, eventType, duration, address, sponsorName, time, ticketPrice], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Error creating event', error: err.message });
        } else {
            res.send('Event created');
        }
    });
};

exports.listEvents = (req, res) => {
    const sql = 'SELECT * FROM events';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
};

exports.getEventDetails = (req, res) => {
    const { id } = req.params;

    const sql = 'SELECT * FROM events WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
};