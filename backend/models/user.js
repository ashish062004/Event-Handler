const db = require('../config/database');

exports.findById = (id, callback) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [id], callback);
};

exports.findByUsername = (username, callback) => {
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], callback);
};

exports.createUser = (user, callback) => {
    const { username, password, role, email, mobileNo } = user;
    const sql = 'INSERT INTO users (username, password, role, email, mobile_no) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [username, password, role, email, mobileNo], callback);
};

exports.updateUser = (id, user, callback) => {
    const { username, role, location, sponsorship_level } = user;
    const sql = 'UPDATE users SET username = ?, role = ?, location = ?, sponsorship_level = ? WHERE id = ?';
    db.query(sql, [username, role, location, sponsorship_level, id], callback);
};