const db = require('../config/database');

exports.createSponsor = (sponsor, callback) => {
    const { name, sponsoring_level, sponsor_id } = sponsor;
    const sql = 'INSERT INTO sponsors (name, sponsoring_level, sponsor_id) VALUES (?, ?, ?)';
    db.query(sql, [name, sponsoring_level, sponsor_id], callback);
};