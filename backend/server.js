/* Student ID: BC123456789 */
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET || 'pro_ecommerce_secure_9922_key';

// Middlewares
app.use(cors());
app.use(express.json());

// In-memory Database Mock (Simulating a User Model)
const users = [];

// --- Middleware: Verify JWT ---
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Add user payload to request
    next();
  } catch (error) {
    res.status(403).json({ success: false, message: 'Invalid or expired token.' });
  }
};

// --- Routes ---

// 1. Register Route (Public)
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ success: false, message: 'Email already registered.' });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User Object
    const newUser = {
      id: Date.now(),
      name,
      email,
      password: hashedPassword,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);

    res.status(201).json({ 
      success: true, 
      message: 'User registered successfully. You can now login.' 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error during registration.' });
  }
});

// 2. Login Route (Public)
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find User
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    // Validate Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    // Generate JWT (24h expiration)
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      SECRET_KEY,
      { expiresIn: '24h' }
    );

    // Send response without password
    const { password: _, ...userData } = user;
    res.json({
      success: true,
      token,
      user: userData
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error during login.' });
  }
});

// 3. Get Current User Data (Protected)
app.get('/api/me', authMiddleware, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const { password: _, ...userData } = user;
  res.json({ success: true, user: userData });
});

// 4. Dashboard Stats (Protected Example)
app.get('/api/dashboard-stats', authMiddleware, (req, res) => {
  res.json({
    success: true,
    stats: {
      totalOrders: 24,
      totalSpent: 1250.50,
      loyaltyPoints: 450,
      membership: 'Gold Member'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Professional Auth Server running on http://localhost:${PORT}`);
});
