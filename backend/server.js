const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { customAlphabet } = require('nanoid');
require('dotenv').config();

const SavingsPlan = require('./models/SavingsPlan');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Generate unique plan code (e.g., SAVE-A3B9)
const generatePlanCode = customAlphabet('ABCDEFGHJKLMNPQRSTUVWXYZ23456789', 4);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/groupsave', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// ========== ROUTES ==========

// Create a new savings plan
app.post('/api/plans', async (req, res) => {
  try {
    const { planName, participants, durationMonths } = req.body;

    // Validation
    if (!planName || !participants || !durationMonths) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (participants.length < 2 || participants.length > 5) {
      return res.status(400).json({ error: 'Participants must be between 2 and 5' });
    }

    // Generate unique plan code
    let planCode;
    let isUnique = false;
    
    while (!isUnique) {
      planCode = `SAVE-${generatePlanCode()}`;
      const existing = await SavingsPlan.findOne({ planCode });
      if (!existing) isUnique = true;
    }

    const savingsPlan = new SavingsPlan({
      planName,
      planCode,
      participants: participants.map(name => ({ name })),
      durationMonths
    });

    await savingsPlan.save();

    res.status(201).json({
      success: true,
      plan: savingsPlan
    });
  } catch (error) {
    console.error('Error creating plan:', error);
    res.status(500).json({ error: 'Failed to create savings plan' });
  }
});

// Get a plan by code
app.get('/api/plans/:planCode', async (req, res) => {
  try {
    const { planCode } = req.params;
    
    const plan = await SavingsPlan.findOne({ planCode });
    
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }

    // Check if plan should be completed
    plan.checkCompletion();
    await plan.save();

    res.json({
      success: true,
      plan
    });
  } catch (error) {
    console.error('Error fetching plan:', error);
    res.status(500).json({ error: 'Failed to fetch plan' });
  }
});

// Add contribution to a plan
app.post('/api/plans/:planCode/contributions', async (req, res) => {
  try {
    const { planCode } = req.params;
    const { participantName, amount, paymentMethod, date, month } = req.body;

    // Validation
    if (!participantName || !amount || !paymentMethod || !date || !month) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const plan = await SavingsPlan.findOne({ planCode });
    
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }

    if (plan.status === 'completed') {
      return res.status(400).json({ error: 'Cannot add contributions to completed plan' });
    }

    // Verify participant exists
    const participantExists = plan.participants.some(p => p.name === participantName);
    if (!participantExists) {
      return res.status(400).json({ error: 'Participant not found in this plan' });
    }

    // Add contribution
    plan.contributions.push({
      participantName,
      amount: parseFloat(amount),
      paymentMethod,
      date: new Date(date),
      month: parseInt(month)
    });

    // Recalculate total
    plan.recalculateTotal();

    // Check if should be completed
    plan.checkCompletion();

    await plan.save();

    res.json({
      success: true,
      plan
    });
  } catch (error) {
    console.error('Error adding contribution:', error);
    res.status(500).json({ error: 'Failed to add contribution' });
  }
});

// Get contributions grouped by month
app.get('/api/plans/:planCode/contributions', async (req, res) => {
  try {
    const { planCode } = req.params;
    
    const plan = await SavingsPlan.findOne({ planCode });
    
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }

    // Group contributions by month
    const contributionsByMonth = {};
    
    for (let i = 1; i <= plan.durationMonths; i++) {
      contributionsByMonth[i] = plan.contributions.filter(c => c.month === i);
    }

    res.json({
      success: true,
      contributionsByMonth,
      totalSaved: plan.totalSaved
    });
  } catch (error) {
    console.error('Error fetching contributions:', error);
    res.status(500).json({ error: 'Failed to fetch contributions' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'GroupSave API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
