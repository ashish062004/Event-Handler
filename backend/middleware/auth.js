function authenticateSession(req, res, next) {
    console.log("middleware session ", req.session.user);
    if (!req.session.user) {
        return res.sendStatus(401); // Unauthorized
    }
    next();
}

// Middleware for Authorization
function authorizeRole(...roles) {
    return (req, res, next) => {
        if (!req.session.user || !roles.includes(req.session.user.role)) {
            return res.status(403).send('Forbidden');
        }
        next();
    };
}

module.exports = { authenticateSession, authorizeRole };