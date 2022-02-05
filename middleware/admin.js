//
// Purpose: MANIBUS admin role check middleware
// Author: Ronny Van Elewyck
// Version: 1.0
// Creation Date: 01.01.2022
// Modification Date: 01.01.2022
//


// 401 Unauthorized: you can try again with a valid token
// 403: forbidden: you not allowed to do this eg. after a number of tries with invalid token

module.exports = function (req, res, next) {
    if (!req.user.isAdmin) return res.status(403).send('Access denied.');

    next();
}

