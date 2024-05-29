const db = require('../config/database');

exports.addPlace = async (req, res) => {
    console.log("Request received for adding place");
    try {
        const { name, address, size, charge_per_hour, place_provider_id } = req.body;
        // Execute the SQL query to insert a new place into the database
        const newPlace = await db.query('INSERT INTO places (name, address, size, charge_per_hour, place_provider_id) VALUES (?, ?, ?, ?, ?)', [name, address, size, charge_per_hour, place_provider_id]);
        // Send a 201 status code with a JSON response indicating success
        res.status(201).json({ message: 'Place added successfully', newPlace });
    } catch (error) {
        // Handle errors
        console.error('Error adding place:', error);
        // Send a 500 status code with a JSON response indicating failure
        res.status(500).json({ message: 'Error adding place' });
    }
};