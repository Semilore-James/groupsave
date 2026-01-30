const mongoose = require('mongoose');

const contributionSchema = new mongoose.Schema({
  participantName: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  month: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const savingsPlanSchema = new mongoose.Schema({
  planName: {
    type: String,
    required: true,
    trim: true
  },
  planCode: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  participants: [{
    name: {
      type: String,
      required: true
    }
  }],
  durationMonths: {
    type: Number,
    required: true,
    min: 1
  },
  contributions: [contributionSchema],
  totalSaved: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'completed'],
    default: 'active'
  },
  startDate: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Calculate current month based on start date
savingsPlanSchema.virtual('currentMonth').get(function() {
  const now = new Date();
  const start = new Date(this.startDate);
  const monthsDiff = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  return Math.min(monthsDiff + 1, this.durationMonths);
});

// Check if plan should be completed
savingsPlanSchema.methods.checkCompletion = function() {
  const now = new Date();
  const start = new Date(this.startDate);
  const monthsDiff = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  
  if (monthsDiff >= this.durationMonths && this.status === 'active') {
    this.status = 'completed';
    return true;
  }
  return false;
};

// Recalculate total saved
savingsPlanSchema.methods.recalculateTotal = function() {
  this.totalSaved = this.contributions.reduce((sum, contribution) => sum + contribution.amount, 0);
};

const SavingsPlan = mongoose.model('SavingsPlan', savingsPlanSchema);

module.exports = SavingsPlan;
