import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }
            try {
                const res = await api.get('/auth/profile');
                setUser(res.data);
            } catch (err) {
                console.error(err);
                navigate('/login');
            }
        };
        fetchProfile();
    }, [navigate]);

    const handleDeleteAccount = async () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            try {
                await api.delete('/auth/delete');
                localStorage.removeItem('token');
                alert('Account deleted.');
                window.location.href = '/';
            } catch (err) {
                console.error(err);
                alert('Failed to delete account.');
            }
        }
    };

    if (!user) return <div className="container section">Loading...</div>;

    return (
        <div className="container section">
            <h2 className="section-title">My Profile</h2>
            <div className="card" style={{ maxWidth: '600px', margin: '0 auto', padding: '30px' }}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontWeight: 'bold', color: '#777' }}>Name</label>
                    <div style={{ fontSize: '1.2rem' }}>{user.name}</div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontWeight: 'bold', color: '#777' }}>Email</label>
                    <div style={{ fontSize: '1.2rem' }}>{user.email}</div>
                </div>
                <div style={{ marginBottom: '30px' }}>
                    <label style={{ fontWeight: 'bold', color: '#777' }}>Member Since</label>
                    <div style={{ fontSize: '1.2rem' }}>{new Date(user.created_at).toLocaleDateString()}</div>
                </div>

                <button onClick={handleDeleteAccount} className="btn btn-outline" style={{ color: 'red', borderColor: 'red', width: '100%' }}>
                    Delete Account
                </button>
            </div>
        </div>
    );
};

export default Profile;
