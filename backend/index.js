const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const morgan = require('morgan'); // Add logging
const path = require('path');
const session = require('express-session');
const formidable = require('formidable');
const { log } = require('console');
const { v4: uuidv4 } = require('uuid'); // Import UUID library
const { createCanvas, loadImage } = require('canvas');
//require('dotenv').config(); // Load environment variables

const app = express();
app.use(session({
    secret: 'your_session_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if you're using HTTPS
}));

app.use(cors());
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Adjust the path as necessary

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'eventHandler'
});

// Connect to the database
db.connect(err => {
    if (err) throw err;
    console.log('Connected to the database');
});

// Logging
app.use(morgan('combined'));

// Middleware for Authentication
// function authenticateSession(req, res, next) {
//     console.log("middleware session ",req.session.user);
//     if (!req.session.user) {
//         return res.sendStatus(401); // Unauthorized
//     }
//     next();
// }

// // Middleware for Authorization
// function authorizeRole(...roles) {
//     console.log("roll --> ",roles);
//     return (req, res, next) => {
//         if (!req.session.user || !roles.includes(req.session.user.role)) {
//             return res.status(403).send('Forbidden');
//         }
//         next();
//     };
// }

function authenticateSession(req, res, next) {
    console.log("middleware session ",req.session.user);
    if (!req.session.user) {
        return res.sendStatus(401); // Unauthorized
    }
    next();
}

// Middleware for Authorization
function authorizeRole(...roles) {
    console.log("roll --> ",roles);
    return (req, res, next) => {
        if (!req.session.user || !roles.includes(req.session.user.role)) {
            return res.status(403).send('Forbidden');
        }
        next();
    };
}
function cleanInput(input) {
    // Remove non-printable characters
    const cleanedInput = input.replace(/[^ -~]+/g, '');
    // Convert to lowercase
    return cleanedInput.toLowerCase();
}


// app.post('/register', (req, res) => {
//     console.log('Received request body:', req.body); // Log the received request body

//     const { username, password, role, email, mobileNo } = req.body;

//     // Check if any required field is undefined
//     if (!username || !password || !role || !email || !mobileNo) {
//         console.log('Missing required field(s)'); // Log if any required field is missing
//         return res.status(400).send({ message: 'All fields are required' });
//     }

//     // Clean the inputs to remove non-printable characters and convert to lowercase
//     const cleanedPassword = cleanInput(password);

//     console.log(`Cleaned Password: ${cleanedPassword}`);

//     // Directly use the role provided by the user
//     const mappedRole = role === 'organizer' ? 'admin' : role;

//     // SQL query to insert a new user
//     const sql = 'INSERT INTO users (username, password, role, email, mobile_no) VALUES (?, ?, ?, ?, ?)';
//     db.query(sql, [username, password, role, email, mobileNo], (err, result) => {
//         if (err) {
//             console.error(err);
//             // Send a 500 status code with a generic error message
//             // Consider sending a more specific error message based on the error type
//             return res.status(500).send({ message: 'Error registering user', error: err.message });
//         } else {
//             // Assuming the user ID is auto-incremented and is the last inserted ID
//             const userId = result.insertId;
//             // Send a 200 status code with the user ID and role
//             res.status(200).send({ message: 'User registered', userId: userId, role: mappedRole });
//         }
//     });
// });

app.post('/register', (req, res) => {
    console.log('Received request body:', req.body); // Log the received request body

    const { username, password, role, email, mobileNo } = req.body;

    // Check if any required field is undefined
    // if (!username || !password || !role || !email || !mobileNo) {
    //     console.log('Missing required field(s)'); // Log if any required field is missing
    //     return res.status(400).send({ message: 'All fields are required' });
    // }

    // Clean the inputs to remove non-printable characters and convert to lowercase
    const cleanedPassword = cleanInput(password);

    console.log(`Cleaned Password: ${cleanedPassword}`);
    console.log("registerd role",role);
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
});
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Check if username exists in database
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err) {
            console.error('Error retrieving user:', err);
            res.status(500).send('Error retrieving user');
            return;
        }
        if (results.length === 0) {
            // User with provided username not found
            res.render('login', { errorMessage: 'Invalid username or password. Please try again.' });
            return;
        }
        // User found, compare passwords
        const user = results[0];
        console.log("login result ",results);
        if (password === user.password) {
            // Passwords match, set session and send response
            req.session.user = { 
                userId: user.id, 
                username: user.username, 
                role: user.role, 
                location: user.location, 
                sponsorship_level: user.sponsorship_level 
            };
            console.log("login ",req.session.user);
            // Manually set the secure flag based on the deployment environment
            const isSecure = process.env.NODE_ENV === 'production'; // Adjust this line based on your deployment environment
            // Set secure cookie
            res.cookie('user', JSON.stringify(req.session.user), {
                path: '/',
                httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
                secure: isSecure, // Use secure flag based on the deployment environment
                sameSite: 'strict' // Prevent the cookie from being sent with cross-site requests
            });
            res.status(200).send({ message: 'User login', userId: user.id, role: user.role });
        } else {
            // Passwords don't match
            res.render('login', { errorMessage: 'Invalid username or password. Please try again.' });
        }
    });
});

app.get('/api/profile', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = req.session.user.userId;
    const sql = `
        SELECT users.*, events.event_name, tickets.ticket_type
        FROM users
        LEFT JOIN bookings ON users.id = bookings.user_id
        LEFT JOIN events ON bookings.event_id = events.id
        LEFT JOIN tickets ON bookings.ticket_id = tickets.id
        WHERE users.id = ?
    `;

    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error fetching profile', error: err.message });
        } else if (result.length > 0) {
            const user = result[0];
            // Assuming the result is an array of objects, each containing user and event/ticket details
            // You might need to transform this data into a more suitable format for your frontend
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    });
});


app.post('/create-event', (req, res) => {
        // const { title, description, date, time,organizerId, eventType, duration, address, sponsorName } = req.body;

        // const eventDateTime = new Date(`${date}T${time}`);
        console.log(req.body);
        const { title, description, date, time, id, eventType, duration, address, sponsorName } = req.body;

        // if (!title || !description || !date || !organizerId || !eventType || !duration || !address || !sponsorName) {
        //     res.status(400).send({ message: 'Missing required fields' });
        //     return;
        // }
        const sql = 'INSERT INTO events (title, description, date, event_type, duration, address, sponsor_name, time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(sql, [title, description, date, eventType, duration, address, sponsorName, time], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send({ message: 'Error creating event', error: err.message });
            } else {
                res.send('Event created');
            }
        });
    
});

// List Events
app.get('/events', (req, res) => {
    // Your existing code for listing events
    const sql = 'SELECT * FROM events';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Book Event
// app.post('/book-event', authenticateSession, (req, res) => {
//     // Your existing code for booking an event
//     const { user_id, event_id } = req.body;

//     const sql = 'INSERT INTO bookings (user_id, event_id) VALUES (?, ?)';
//     db.query(sql, [user_id, event_id], (err, result) => {
//         if (err) throw err;
//         res.send('Event booked');
//     });
// });

// app.post('/book-event', (req, res) => {
//     const { user_id, event_id, firstName, lastName, email, mobileNumber } = req.body;

//     // Insert booking
//     const bookingSql = 'INSERT INTO bookings (user_id, event_id) VALUES (?, ?)';
//     db.query(bookingSql, [user_id, event_id], (err, result) => {
//         if (err) throw err;

//         // Get the ID of the newly inserted booking
//         const bookingId = result.insertId;

//         // Insert booking details
//         const detailsSql = 'INSERT INTO booking_details (booking_id, first_name, last_name, email, mobile_number) VALUES (?, ?, ?, ?, ?)';
//         db.query(detailsSql, [bookingId, firstName, lastName, email, mobileNumber], (err, result) => {
//             if (err) throw err;
//             res.send('Event booked and details stored');
//         });
//     });
// });



// Modify /book-event endpoint to generate and return a ticket ID
app.post('/book-event', (req, res) => {
    const { firstName, lastName, email, mobileNumber, user_id, event_id } = req.body;
    // Generate unique ticket ID
    const ticketId = uuidv4();

    // Insert booking
    const bookingSql = 'INSERT INTO bookings (user_id, event_id) VALUES (?, ?)';
    db.query(bookingSql, [user_id, event_id], (err, result) => {
        if (err) {
            console.error('Error booking event:', err);
            return res.status(500).send('Error booking event');
        }
        // Get the ID of the newly inserted booking
        const bookingId = result.insertId;

        // Insert booking details
        const detailsSql = 'INSERT INTO booking_details (booking_id, first_name, last_name, email, mobile_number, ticket_id) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(detailsSql, [bookingId, firstName, lastName, email, mobileNumber, ticketId], (err, result) => {
            if (err) {
                console.error('Error inserting booking details:', err);
                return res.status(500).send('Error inserting booking details');
            }
            // Return the ticket ID
            res.send({ ticketId });
        });
    });
});

// Placeholder function to generate ticket information based on ticketId
// const generateTicketInfo = async (ticketId) => {
//     // Placeholder SQL query to retrieve ticket information from the database
//     const query = 'SELECT bd.id AS booking_detail_id, b.id AS booking_id, e.title AS event_name, e.date AS event_date, e.address AS venue, bd.first_name, bd.last_name, bd.email, bd.mobile_number FROM bookings b JOIN booking_details bd ON b.id = bd.booking_id JOIN events e ON b.event_id = e.id WHERE bd.id = ?;';
//     console.log("function chal raha hai");
//     try {
//         // Execute the query
//         const result = await new Promise((resolve, reject) => {
//             db.query(query, [ticketId], (err, result) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(result);
//                 }
//             });
//         });
//         console.log("result",result);
//         // Check if a ticket with the given ID exists
//         if (result.length === 0) {
//             return null; // Return null if no ticket found
//         }

//         // Extract ticket information from the query result
//         const ticketInfo = {
//             ticketId: result[0].id,
//             eventName: result[0].event_name,
//             eventDate: result[0].event_date,
//             venue: result[0].venue,
//             // Add more ticket information as needed
//         };
//         console.log("ticket info in function",ticketInfo);
//         return ticketInfo;
//     } catch (err) {
//         console.error('Error retrieving ticket information:', err);
//         return null; // Return null if an error occurs
//     }
// };
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
    // Create a new canvas with dimensions for the ticket image
    const canvas = createCanvas(400, 200);
    const ctx = canvas.getContext('2d');
  
    // Load background image or draw shapes
    // For demonstration purposes, let's draw a simple ticket shape
    ctx.fillStyle = 'white'; // Set background color
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Draw a white background
  
    ctx.fillStyle = 'black'; // Set text color
    ctx.font = 'bold 20px Arial'; // Set font style
    ctx.fillText('Ticket ID: ' + ticketInfo.ticketId, 20, 40); // Draw ticket ID
    ctx.fillText('Event Name: ' + ticketInfo.eventName, 20, 80); // Draw event name
    ctx.fillText('Date: ' + ticketInfo.eventDate, 20, 120); // Draw event date
    ctx.fillText('Venue: ' + ticketInfo.venue, 20, 160); // Draw venue
  
    // Return the canvas as a base64 encoded PNG image
    return canvas.toDataURL('image/png');
  };

// Endpoint to serve ticket image for download
// app.get('/download-ticket/:ticketId', (req, res) => {
//     const ticketId = req.params.ticketId;
//     // Retrieve ticket information from the database or generate dynamically based on ticketId
//     const ticketInfo = generateTicketInfo(ticketId);
//     console.log("ticket download info ",ticketInfo);
//     if (!ticketInfo) {
//         return res.status(404).send('Ticket not found');
//     }

//     // Generate ticket image (e.g., using Canvas or an image template)
//     const ticketImage = generateTicketImage(ticketInfo);

//     // Set response headers to indicate image content
//     res.set('Content-Type', 'image/png');
//     // Send the ticket image as the response
//     console.log("backend of download ticket ",ticketImage);
//     res.send(ticketImage);
// });

app.get('/download-ticket/:ticketId', async (req, res) => {
    const ticketId = req.params.ticketId;
    
    try {
        // Retrieve ticket information asynchronously
        const ticketInfo = await generateTicketInfo(ticketId);
        console.log("ticket download info ",ticketInfo);
        if (!ticketInfo) {
            return res.status(404).send('Ticket not found');
        }

        // Generate ticket image (e.g., using Canvas or an image template) based on ticketInfo
        const ticketImage = generateTicketImage(ticketInfo);

        // Set response headers to indicate image content
        res.set('Content-Type', 'image/png');
        // Send the ticket image as the response
        res.send(ticketImage);
    } catch (error) {
        console.error('Error generating ticket:', error);
        return res.status(500).send('Internal Server Error');
    }
});



// List Users for Admin/Organizers
app.get('/admin/users', authenticateSession, authorizeRole('admin'), (req, res) => {
    // Your existing code for listing users for admin/organizers
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// View Event Details
app.get('/event/:id', (req, res) => {
    // Your existing code for viewing event details
    const { id } = req.params;

        const sql = 'SELECT * FROM events WHERE id = ?';
        db.query(sql, [id], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
});

// Update User for Admin/Organizers
app.put('/admin/users/:id', authenticateSession, authorizeRole('admin'), (req, res) => {
    // Your existing code for updating a user for admin/organizers
    const { id } = req.params;
    const { username, role, location, sponsorship_level } = req.body;

    const sql = 'UPDATE users SET username = ?, role = ?, location = ?, sponsorship_level = ? WHERE id = ?';
    db.query(sql, [username, role, location, sponsorship_level, id], (err, result) => {
        if (err) throw err;
        res.send('User updated');
    });
});

// About Us Endpoint
app.get('/about-us', (req, res) => {
    // Your existing code for the About Us endpoint
    // This could be static content or fetched from a database
    const aboutUsContent = "Your service or organization's description here.";
    res.send(aboutUsContent);
});

// Place-Provider Submit Location
app.post('/place-provider/submit', authenticateSession, authorizeRole('place-provider'), (req, res) => {
    // Your existing code for place-provider to submit location
    const { user_id, location } = req.body;

        const sql = 'UPDATE users SET location = ? WHERE id = ?';
        db.query(sql, [location, user_id], (err, result) => {
            if (err) throw err;
            res.send('Location submitted');
        });
});

// Sponsor Submit Sponsorship
app.post('/sponsor/submit', authenticateSession, authorizeRole('sponsor'), (req, res) => {
    // Your existing code for sponsor to submit sponsorship
    const { user_id, sponsorship_level } = req.body;

    const sql = 'UPDATE users SET sponsorship_level = ? WHERE id = ?';
    db.query(sql, [sponsorship_level, user_id], (err, result) => {
        if (err) throw err;
        res.send('Sponsorship information submitted');
    });
});

// List Users by Role
app.get('/users/:role', authenticateSession, authorizeRole('admin'), (req, res) => {
    // Your existing code for listing users by role
    const { role } = req.params;

    const sql = 'SELECT * FROM users WHERE role = ?';
    db.query(sql, [role], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));