const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({ email, password: hashedPassword});        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        return res.status(200).json({
            success: true,
            user,
            token,
            msg: 'User registered successfully'
        });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ error: 'This email is already registered' });
        }
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, isVerified: true });
        if (!user) {
            return res.status(422).json({ error: 'Invalid credentials' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(422).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        return res.status(200).json({
            success: true,
            user,
            token,
            msg: 'User logged in successfully'
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
}