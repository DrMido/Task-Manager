/* eslint-disable no-undef */

require ('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

function assignToken(user) {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}
function verifyToken(req, res, next) {
    if (!req.headers.token) return res.status(401).json({ msg: 'No token, authorization denied' }).end();
    const token = req.headers.token;
    return jwt.verify(token, process.env.JWT_SECRET,(err, decoded) => {
        if (err) {
            return res.status(401).json({ msg: 'Token is not valid' }).end();
        }
        const userID = decoded;
        User.findById(userID).then((user) => {
            if (!user) {
                return res.status(401).json({ msg: 'No user found' }).end();
            }
            req.user = user;
            return next();
        })
        });
    };
module.exports = assignToken, verifyToken