import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import api from '../api';
import '../styles/layout.css';

// Fallback data in case API fails (since backend might not be running)
const dummyProducts = [
    { id: 1, name: 'Matte Clay', category: 'Styling', price: 25.00, image_url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3' },
    { id: 2, name: 'Nourishing Shampoo', category: 'Care', price: 18.00, image_url: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3' },
    { id: 4, name: 'Texture Powder', category: 'Styling', price: 22.00, image_url: 'https://images.unsplash.com/photo-1595348020949-87adf9642719?auto=format&fit=crop&q=80&w=1926&ixlib=rb-4.0.3' }
];

const Home = () => {
    const [trendingProducts, setTrendingProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const res = await api.get('/products/trending');
                setTrendingProducts(res.data);
            } catch (err) {
                console.error("Failed to fetch products", err);
                setTrendingProducts(dummyProducts);
            } finally {
                setLoading(false);
            }
        };
        fetchTrending();
    }, []);

    return (
        <div>
            {/* Hero Section */}
            <section className="hero" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1621600411688-4be93cd68504?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.0.3")' }}>
                <div className="hero-content">
                    <h1 className="hero-title">ELEVATE YOUR STYLE</h1>
                    <p className="hero-subtitle">Premium grooming essentials for the modern gentleman.</p>
                    <Link to="/shop" className="btn btn-primary">Shop Collection</Link>
                </div>
            </section>

            {/* Trending Section */}
            <section className="section bg-light">
                <div className="container">
                    <h2 className="section-title">Trending Essentials</h2>
                    {loading ? (
                        <p style={{ textAlign: 'center' }}>Loading...</p>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
                            {trendingProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                    <div style={{ textAlign: 'center', marginTop: '50px' }}>
                        <Link to="/shop" className="btn btn-outline">View All Products</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
