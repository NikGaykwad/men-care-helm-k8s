import React from 'react';

const Footer = () => {
    return (
        <footer style={{ background: '#1a1a1a', color: '#fff', padding: '40px 0', marginTop: 'auto' }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <p>&copy; 2024 Men's Grooming. All rights reserved.</p>
                <div style={{ marginTop: '20px' }}>
                    <a href="#" style={{ margin: '0 10px', color: '#888' }}>Privacy Policy</a>
                    <a href="#" style={{ margin: '0 10px', color: '#888' }}>Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
