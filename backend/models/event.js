const db = require('../config/database');

exports.findAll = (callback) => {
    const sql = 'SELECT * FROM events';
    db.query(sql, callback);
};

exports.findById = (id, callback) => {
    const sql = 'SELECT * FROM events WHERE id = ?';
    db.query(sql, [id], callback);
};

exports.createEvent = (event, callback) => {
    const { title, description, date, organizer_id, event_type, duration, address, sponsor_name, time, ticketPrice } = event;
    const sql = 'INSERT INTO events (title, description, date, organizer_id, event_type, duration, address, sponsor_name, time, ticketPrice) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [title, description, date, organizer_id, event_type, duration, address, sponsor_name, time, ticketPrice], callback);
};