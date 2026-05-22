import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Settings = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Page load hote hi login user ki details fetch karne ke liye (ya localstorage se lein)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); // Aapka auth token
        const res = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data) {
          setFormData({
            name: res.data.name || '',
            email: res.data.email || '',
            bio: res.data.bio || ''
          });
        }
      } catch (err) {
        console.error("Error fetching profile data", err);
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('token');
      const res = await axios.put('http://localhost:5000/api/users/update-profile', 
        { name: formData.name, bio: formData.bio },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Something went wrong' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', color: '#fff', maxWidth: '600px' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px', fontWeight: '600' }}>Account Settings</h2>
      <p style={{ color: '#aaa', marginBottom: '30px' }}>Update your seller profile information details.</p>

      {message.text && (
        <div style={{
          padding: '12px',
          borderRadius: '6px',
          marginBottom: '20px',
          backgroundColor: message.type === 'success' ? '#1b4332' : '#641111',
          color: message.type === 'success' ? '#52b788' : '#e63946'
        }}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#ccc' }}>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              backgroundColor: '#1e1e1e',
              border: '1px solid #333',
              color: '#fff',
              outline: 'none'
            }}
            required
          />
        </div>

        {/* Email Input (Disabled kyunki email aam tor par change nahi hoti) */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#ccc' }}>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              backgroundColor: '#121212',
              border: '1px solid #222',
              color: '#666',
              cursor: 'not-allowed'
            }}
          />
        </div>

        {/* Bio Input */}
        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#ccc' }}>Seller Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="4"
            placeholder="Tell your buyers about your art vision..."
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              backgroundColor: '#1e1e1e',
              border: '1px solid #333',
              color: '#fff',
              outline: 'none',
              resize: 'none'
            }}
          />
        </div>

        {/* Submit Button - Matches your purple theme */}
        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: '#a855f7',
            color: '#fff',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default Settings;