/* Student ID: BC123456789 */
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { LogOut, User, Mail, Shield, ShoppingBag, CreditCard, Settings, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/dashboard-stats');
        if (response.data.success) {
          setStats(response.data.stats);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };
    if (user) fetchStats();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div style={{ minHeight: '100vh', padding: '2rem' }}>
      <nav className="d-flex justify-content-between align-items-center mb-8" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.025em' }}>
          PRO<span style={{ color: 'var(--primary)' }}>STORE</span>
        </h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Logged in as: <strong>{user.name}</strong></span>
          <button onClick={handleLogout} className="btn" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </nav>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {/* Profile Card */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-6"
        >
          <div className="text-center mb-6">
            <img 
              src={user.avatar} 
              alt={user.name} 
              style={{ width: '100px', height: '100px', borderRadius: '50%', border: '4px solid var(--primary)', marginBottom: '1rem' }}
            />
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{user.name}</h2>
            <span style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.875rem' }}>{stats?.membership || 'Store Member'}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
              <User size={20} color="var(--text-muted)" />
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Unique ID</p>
                <p style={{ fontWeight: '500', fontSize: '0.9rem' }}>#{user.id.toString().slice(-6)}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
              <Mail size={20} color="var(--text-muted)" />
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Email Address</p>
                <p style={{ fontWeight: '500', fontSize: '0.9rem' }}>{user.email}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
              <Shield size={20} color="var(--text-muted)" />
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Security Status</p>
                <p style={{ fontWeight: '500', color: 'var(--success)', fontSize: '0.9rem' }}>JWT (bcrypt) Secured</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats/Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-6"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}
          >
            <div style={{ padding: '1.5rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '20px', textAlign: 'center' }}>
              <ShoppingBag size={24} color="var(--primary)" style={{ marginBottom: '0.5rem' }} />
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Orders</p>
              <p style={{ fontSize: '1.5rem', fontWeight: '800' }}>{stats?.totalOrders || '0'}</p>
            </div>
            <div style={{ padding: '1.5rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '20px', textAlign: 'center' }}>
              <CreditCard size={24} color="var(--success)" style={{ marginBottom: '0.5rem' }} />
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Points</p>
              <p style={{ fontSize: '1.5rem', fontWeight: '800' }}>{stats?.loyaltyPoints || '0'}</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
            style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
              <TrendingUp size={24} color="var(--primary)" />
              <h3 style={{ fontWeight: '700' }}>Spending Overview</h3>
            </div>
            <p style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>${stats?.totalSpent || '0.00'}</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Total lifetime spending in our store.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
