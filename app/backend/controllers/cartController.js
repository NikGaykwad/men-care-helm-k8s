const db = require('../config/db');

exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const [existing] = await db.query('SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?', [req.user.id, productId]);

        if (existing.length > 0) {
            await db.query('UPDATE cart_items SET quantity = quantity + ? WHERE id = ?', [quantity || 1, existing[0].id]);
        } else {
            await db.query('INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)', [req.user.id, productId, quantity || 1]);
        }
        res.json({ message: 'Item added to cart' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCart = async (req, res) => {
    try {
        const [cartItems] = await db.query(
            `SELECT c.id, c.quantity, p.name, p.price, p.image_url, p.id as product_id 
             FROM cart_items c 
             JOIN products p ON c.product_id = p.id 
             WHERE c.user_id = ?`,
            [req.user.id]
        );
        res.json(cartItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        await db.query('DELETE FROM cart_items WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
        res.json({ message: 'Item removed from cart' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.checkout = async (req, res) => {
    try {
        await db.query('DELETE FROM cart_items WHERE user_id = ?', [req.user.id]);
        res.json({ message: 'Checkout successful' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
