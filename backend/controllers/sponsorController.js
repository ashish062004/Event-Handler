const db = require('../config/database');

exports.submitSponsorship = (req, res) => {
    const { name, sponsorship_level, sponsor_id } = req.body;
    const sql = 'INSERT INTO sponsors (name, sponsoring_level, sponsor_id) VALUES (?, ?, ?)';
    db.query(sql, [name, sponsorship_level, sponsor_id], (err, result) => {
        if (err) throw err;
        res.send('Sponsorship information submitted');
    });
};