import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { FaTrash } from 'react-icons/fa';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCart = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }
            try {
                const res = await api.get('/cart');
                setCartItems(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCart();
    }, [navigate]);

    const removeFromCart = async (id) => {
        try {
            await api.delete(`/cart/remove/${id}`);
            setCartItems(cartItems.filter(item => item.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const total = cartItems.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0);

    if (loading) return <div className="container section">Loading...</div>;

    return (
        <div className="container section">
            <h2 className="section-title">Your Cart</h2>
            {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center' }}>
                    <p>Your cart is empty.</p>
                    <Link to="/shop" className="btn btn-primary" style={{ marginTop: '20px', display: 'inline-block' }}>Go Shopping</Link>
                </div>
            ) : (
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    {cartItems.map(item => (
                        <div key={item.id} style={{ display: 'flex', alignItems: 'center', padding: '20px', background: 'white', marginBottom: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                            <img src={item.image_url} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                            <div style={{ flex: 1, marginLeft: '20px' }}>
                                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{item.name}</h3>
                                <p style={{ color: '#777' }}>${item.price} x {item.quantity}</p>
                            </div>
                            <div style={{ fontWeight: 'bold', fontSize: '1.2rem', marginRight: '20px' }}>
                                ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                            </div>
                            <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', color: 'red', fontSize: '1.2rem' }}>
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                    <div style={{ textAlign: 'right', marginTop: '30px', borderTop: '2px solid #eee', paddingTop: '20px' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>
                            Total: ${total.toFixed(2)}
                        </div>
                        <Link to="/checkout" className="btn btn-primary">Proceed to Checkout</Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
