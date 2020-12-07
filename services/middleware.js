const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    return jwt.sign({payload}, "password", {
        expiresIn: 86400 // expires in 24 hours
    });
}

const validateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;    
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = {
    generateToken,
    validateToken
}