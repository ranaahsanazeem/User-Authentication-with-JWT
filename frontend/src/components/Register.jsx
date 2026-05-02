/* Student ID: BC123456789 */
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, User, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    const result = await register(formData.name, formData.email, formData.password);
    
    if (result.success) {
      setSuccess(result.message);
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setError(result.message);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-4" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-5 w-100" 
        style={{ maxWidth: '480px' }}
      >
        <div className="text-center mb-8" style={{ marginBottom: '2rem' }}>
          <div className="d-inline-flex p-3 rounded-circle bg-primary mb-4" style={{ background: 'var(--primary)', padding: '1rem', borderRadius: '50%', display: 'inline-flex', marginBottom: '1rem' }}>
            <UserPlus size={32} color="white" />
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>Create Account</h2>
          <p style={{ color: 'var(--text-muted)' }}>Join our premium e-commerce community</p>
        </div>

        {success && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="d-flex align-items-center gap-3 p-4 rounded-3 mb-6"
            style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', border: '1px solid var(--success)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <CheckCircle size={20} />
            <p style={{ fontWeight: '500', fontSize: '0.9rem' }}>{success}</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name</label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                name="name"
                type="text" 
                className="input-field" 
                style={{ paddingLeft: '40px' }}
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                name="email"
                type="email" 
                className="input-field" 
                style={{ paddingLeft: '40px' }}
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                name="password"
                type="password" 
                className="input-field" 
                style={{ paddingLeft: '40px' }}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="error-msg d-flex align-items-center gap-2"
              style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <AlertCircle size={16} />
              <span>{error}</span>
            </motion.div>
          )}

          <button 
            type="submit" 
            className="btn btn-primary w-100" 
            style={{ width: '100%', marginTop: '10px' }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center" style={{ marginTop: '2rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          <p>Already have an account? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>Login here</Link></p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
