//
// Purpose: MANIBUS auth middleware for jwt token
// Author: Ronny Van Elewyck
// Version: 1.0
// Creation Date: 01.01.2022
// Modification Date: 01.01.2022
//


const jwt = require('jsonwebtoken');

const config = require('config');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided!');

   try {
    const decoded =  jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decoded;
    next();
   }
   catch {
    res.status(400).send('Invalid token.');
   }


}

module.exports = auth;

