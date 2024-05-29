const db = require('../config/database');

exports.getUserProfile = (req, res) => {
    const userId = req.params.userId;
    console.log("in profile userID ", userId);

    const sqlUser = `
    SELECT id, username, email, mobile_no, role FROM users WHERE id = ?
    `;

    db.query(sqlUser, [userId], (err, userResult) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error fetching user', error: err.message });
        } else if (userResult.length > 0) {
            const user = userResult[0];

            if (user.role === 'attendee') {
                const sqlAttendee = `
                SELECT users.*, bookings.id AS booking_id, events.title AS event_name
                FROM users
                LEFT JOIN bookings ON users.id = bookings.user_id
                LEFT JOIN events ON bookings.event_id = events.id
                WHERE users.id = ?
                `;

                db.query(sqlAttendee, [userId], (err, result) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ message: 'Error fetching profile', error: err.message });
                    } else {
                        const user = {
                            id: result[0].id,
                            fullName: result[0].username,
                            email: result[0].email,
                            mobileNo: result[0].mobile_no,
                            role: result[0].role,
                            bookedEvents: result.map(r => ({
                                id: r.booking_id,
                                event_name: r.event_name,
                                ticket_type: r.ticket_type
                            })).filter(e => e.event_name)
                        };
                        res.json(user);
                    }
                });
            } else if (user.role === 'admin') {
                const sqlAdmin = `
                SELECT users.*, events.id AS event_id, events.title AS event_name
                FROM users
                LEFT JOIN events ON events.organizer_id = users.id
                WHERE users.id = ?
                `;

                db.query(sqlAdmin, [userId], (err, adminResult) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ message: 'Error fetching profile', error: err.message });
                    } else {
                        const adminUser = {
                            id: adminResult[0].id,
                            fullName: adminResult[0].username,
                            email: adminResult[0].email,
                            mobileNo: adminResult[0].mobile_no,
                            role: adminResult[0].role,
                            createdEvents: adminResult.map(r => ({
                                event_id: r.event_id,
                                event_name: r.event_name
                            }))
                        };
                        res.json(adminUser);
                    }
                });
            } else {
                res.status(400).json({ message: 'Invalid user role' });
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    });
};

exports.listUsers = (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
};

exports.listUsersByRole = (req, res) => {
    const { role } = req.params;

    const sql = 'SELECT * FROM users WHERE role = ?';
    db.query(sql, [role], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
};

exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { username, role, location, sponsorship_level } = req.body;

    const sql = 'UPDATE users SET username = ?, role = ?, location = ?, sponsorship_level = ? WHERE id = ?';
    db.query(sql, [username, role, location, sponsorship_level, id], (err, result) => {
        if (err) throw err;
        res.send('User updated');
    });
};