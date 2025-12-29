const express = require('express');
const router = express.Router();
const { addToCart, getCart, removeFromCart, checkout } = require('../controllers/cartController');
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

router.post('/add', authMiddleware, addToCart);
router.get('/', authMiddleware, getCart);
router.delete('/remove/:id', authMiddleware, removeFromCart);
router.post('/checkout', authMiddleware, checkout);

module.exports = router;
