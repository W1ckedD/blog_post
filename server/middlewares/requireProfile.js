const jwt = require('jsonwebtoken');
const Profile = require('../models/Profile');

module.exports = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(403).json({ error: 'You must be logged in' });
        }
        const token = authorization.replace('Bearer ', '');
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        const profile = await Profile.findOne({ user_id: id });
        if (!profile) {
            return res.status(403).json({ error: 'You must be logged in' });
        }
        req.profile = profile;
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
}