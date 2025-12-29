const express = require('express');
const router = express.Router();
const { register, login, getProfile, deleteAccount } = require('../controllers/authController');
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile);
router.delete('/delete', authMiddleware, deleteAccount);

module.exports = router;
