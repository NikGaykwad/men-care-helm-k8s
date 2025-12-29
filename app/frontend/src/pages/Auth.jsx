import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

const Auth = ({ isRegister }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isRegister) {
                await api.post('/auth/register', formData);
                alert('Registration successful! Please login.');
                navigate('/login');
            } else {
                const res = await api.post('/auth/login', { email: formData.email, password: formData.password });
                localStorage.setItem('token', res.data.token);
                // Force reload or redirect to update auth state
                window.location.href = '/';
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Authentication failed');
        }
    };

    return (
        <div className="container section" style={{ maxWidth: '400px' }}>
            <h2 className="section-title">{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
            <form onSubmit={handleSubmit} className="card" style={{ padding: '30px' }}>
                {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}

                {isRegister && (
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                )}
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                    {isRegister ? 'Sign Up' : 'Login'}
                </button>

                <p style={{ textAlign: 'center', marginTop: '20px' }}>
                    {isRegister ? 'Already have an account? ' : "Don't have an account? "}
                    <Link to={isRegister ? '/login' : '/register'} style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>
                        {isRegister ? 'Login' : 'Sign Up'}
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Auth;
