const db = require('../config/database');

exports.createPlace = (place, callback) => {
    const { name, address, size, charge_per_hour, place_provider_id } = place;
    const sql = 'INSERT INTO places (name, address, size, charge_per_hour, place_provider_id) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [name, address, size, charge_per_hour, place_provider_id], callback);
};