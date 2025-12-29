import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import api from '../api';

const dummyAllProducts = [
    { id: 1, name: 'Matte Clay', category: 'Styling', price: 25.00, image_url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3' },
    { id: 2, name: 'Nourishing Shampoo', category: 'Care', price: 18.00, image_url: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3' },
    { id: 3, name: 'Revitalizing Conditioner', category: 'Care', price: 20.00, image_url: 'https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&q=80&w=1926&ixlib=rb-4.0.3' },
    { id: 4, name: 'Texture Powder', category: 'Styling', price: 22.00, image_url: 'https://images.unsplash.com/photo-1595348020949-87adf9642719?auto=format&fit=crop&q=80&w=1926&ixlib=rb-4.0.3' },
    { id: 5, name: 'Sea Salt Spray', category: 'Styling', price: 19.50, image_url: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=1780&ixlib=rb-4.0.3' }
];

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get('/products');
                setProducts(res.data);
            } catch (err) {
                console.error("Failed to fetch products", err);
                setProducts(dummyAllProducts);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="section">
            <div className="container">
                <h2 className="section-title">All Products</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Shop;
