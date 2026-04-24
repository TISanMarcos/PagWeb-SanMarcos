import express from 'express';
import cors from 'cors';
import { mockProducts, mockUsersDB, mockPromotions } from './data/mockDB.js';

const app = express();
app.use(cors());
app.use(express.json());

// Catalog Endpoint
app.get('/api/products/:segment', (req, res) => {
  const { segment } = req.params;
  
  // Simulate network delay
  setTimeout(() => {
    if (segment === 'admin') return res.json(mockProducts);
    const filtered = mockProducts.filter(p => p.segment === 'both' || p.segment === segment);
    res.json(filtered);
  }, 500);
});

// Promotions Endpoint
app.get('/api/promotions', (req, res) => {
  res.json(mockPromotions);
});

// Auth / User Endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, role } = req.body;
  
  setTimeout(() => {
    let user = mockUsersDB.find(u => u.email === email);
    
    // Auto-register mock user if not found
    if (!user) {
      user = {
        uid: `usr_${Date.now()}`,
        email,
        role: role || 'b2c',
        name: email.split('@')[0],
        ...(role === 'b2b' && {
          credit: {
            allocated: 0,
            currentDebt: 0,
            available: 0,
            validUntil: 'Pendiente',
            status: 'Suspendido'
          }
        })
      };
      mockUsersDB.push(user);
    }
    res.json(user);
  }, 800);
});

// --- Admin Endpoints ---

// Get all clients
app.get('/api/clients', (req, res) => {
  res.json(mockUsersDB.filter(u => u.role !== 'admin'));
});

// Update client credit
app.patch('/api/clients/:uid/credit', (req, res) => {
  const { uid } = req.params;
  const { updateField, value } = req.body;
  
  const user = mockUsersDB.find(u => u.uid === uid);
  if (user && user.credit) {
    user.credit[updateField] = value;
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found or no credit profile' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Zona.Pet Intermediate Backend API running on http://localhost:${PORT}`);
});
