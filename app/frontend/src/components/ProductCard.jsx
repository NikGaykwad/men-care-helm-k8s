import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components.css';

const ProductCard = ({ product }) => {
    return (
        <div className="card product-card">
            <Link to={`/product/${product.id}`} className="product-image-container">
                <img src={product.image_url} alt={product.name} className="product-image" />
            </Link>
            <div className="product-info">
                <div>
                    <div className="product-category">{product.category}</div>
                    <h3 className="product-name">{product.name}</h3>
                    <div className="product-price">${product.price}</div>
                </div>
                <Link to={`/product/${product.id}`} className="btn btn-outline" style={{ width: '100%', textAlign: 'center', display: 'block' }}>
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;
