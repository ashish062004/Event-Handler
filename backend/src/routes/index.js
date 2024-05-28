const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan'); // Add logging
const path = require('path');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid'); // Import UUID library

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
app.set('views', path.join(__dirname, 'views'));

// Database connection
const db = require('../config/db');

// Logging
app.use(morgan('combined'));

// Routes
const userRoutes = require('./userRoutes');
app.use('/users', userRoutes);

const eventRoutes = require('./eventRoutes');
app.use('/events', eventRoutes);

const placeRoutes = require('./placeRoutes');
app.use('/places', placeRoutes);

const sponsorRoutes = require('./sponsorRoutes');
app.use('/sponsor', sponsorRoutes);

const authRoutes = require('./authRoutes');
app.use('/', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
