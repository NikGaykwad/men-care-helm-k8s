import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get(`/products/${id}`);
                setProduct(res.data);
            } catch (err) {
                // Fallback
                setProduct({
                    id: id,
                    name: 'Product Name (Mock)',
                    price: 25.00,
                    description: 'Detailed description of the product goes here. This is a premium product for your grooming needs.',
                    image_url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3',
                    category: 'Category'
                });
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const addToCart = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setMessage('Please login to add items to cart.');
            return;
        }
        try {
            await api.post('/cart/add', { productId: id, quantity });
            setMessage('Added to cart successfully!');
        } catch (err) {
            setMessage('Failed to add to cart.');
        }
    };

    if (loading) return <div className="container section">Loading...</div>;
    if (!product) return <div className="container section">Product not found</div>;

    return (
        <div className="container section">
            <div style={{ display: 'flex', gap: '50px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '300px' }}>
                    <img src={product.image_url} alt={product.name} style={{ width: '100%', borderRadius: '8px', boxShadow: 'var(--shadow)' }} />
                </div>
                <div style={{ flex: 1, minWidth: '300px' }}>
                    <div style={{ color: 'var(--secondary)', textTransform: 'uppercase', marginBottom: '10px' }}>{product.category}</div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>{product.name}</h1>
                    <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '30px' }}>{product.description}</p>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '30px' }}>${product.price}</div>

                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '30px' }}>
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                            style={{ width: '80px', margin: 0 }}
                        />
                        <button onClick={addToCart} className="btn btn-primary">Add to Cart</button>
                    </div>
                    {message && <div style={{ padding: '10px', background: '#eef', color: '#333', borderRadius: '4px' }}>{message}</div>}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
