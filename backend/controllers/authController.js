const { cleanInput } = require('../middleware/utils');
const db = require('../config/database');

exports.register = (req, res) => {
    const { username, password, role, email, mobileNo } = req.body;
    // Clean the inputs to remove non-printable characters and convert to lowercase
    const cleanedPassword = cleanInput(password);
    // Directly use the role provided by the user
    const mappedRole = role === 'organizer' ? 'admin' : role;

    // SQL query to insert a new user
    const sql = 'INSERT INTO users (username, password, role, email, mobile_no) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [username, cleanedPassword, mappedRole, email, mobileNo], (err, result) => {
        if (err) {
            console.error(err);
            // Send a 500 status code with a generic error message
            // Consider sending a more specific error message based on the error type
            return res.status(500).send({ message: 'Error registering user', error: err.message });
        } else {
            // Assuming the user ID is auto-incremented and is the last inserted ID
            const userId = result.insertId;
            // Send a 200 status code with the user ID and role
            res.status(200).send({ message: 'User registered', userId: userId, role: mappedRole });
        }
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.error('Error retrieving user:', err);
            res.status(500).send('Error retrieving user');
            return;
        }
        if (results.length === 0) {
            res.render('login', { errorMessage: 'Invalid username or password. Please try again.' });
            return;
        }
        const user = results[0];
        if(password === user.password){
            req.session.user = {
                userId: user.id,
                username: user.username,
                role: user.role
            };
            const isSecure = process.env.NODE_ENV === 'production';
            res.cookie('user', JSON.stringify(req.session.user), {
                path: '/',
                httpOnly: true,
                secure: isSecure,
                sameSite: 'strict'
            });
            res.status(200).send({ message: 'User login', userId: user.id, role: user.role });
        } else {
            res.status(401).send({ message: 'Invalid username or password. Please try again.' });
        }
    });
};
