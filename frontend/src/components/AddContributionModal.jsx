import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { X, DollarSign } from 'lucide-react';
import { addContribution } from '../services/api';

const AddContributionModal = ({ plan, currentMonth, onClose, onSuccess }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      month: currentMonth
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');

    try {
      const contributionData = {
        participantName: data.participantName,
        amount: parseFloat(data.amount),
        paymentMethod: data.paymentMethod,
        date: data.date,
        month: parseInt(data.month)
      };

      const response = await addContribution(plan.planCode, contributionData);

      if (response.success) {
        onSuccess();
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add contribution');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-navy/50 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-fade-in">
      <div className="card max-w-lg w-full p-8 animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="bg-coral/10 p-3 rounded-xl mr-3">
              <DollarSign className="w-6 h-6 text-coral" />
            </div>
            <h2 className="text-2xl font-display font-bold text-navy">
              Add Contribution
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-navy/40 hover:text-navy transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Participant Selection */}
          <div>
            <label className="block text-navy font-semibold mb-2 font-body">
              Participant *
            </label>
            <select
              className="input-field"
              {...register('participantName', { required: 'Please select a participant' })}
            >
              <option value="">Select participant</option>
              {plan.participants.map((participant, index) => (
                <option key={index} value={participant.name}>
                  {participant.name}
                </option>
              ))}
            </select>
            {errors.participantName && (
              <p className="text-red-500 text-sm mt-1">{errors.participantName.message}</p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="block text-navy font-semibold mb-2 font-body">
              Amount (₦) *
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="Enter amount"
              className="input-field"
              {...register('amount', { 
                required: 'Amount is required',
                min: { value: 0.01, message: 'Amount must be greater than 0' }
              })}
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
            )}
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-navy font-semibold mb-2 font-body">
              Payment Method *
            </label>
            <select
              className="input-field"
              {...register('paymentMethod', { required: 'Please select a payment method' })}
            >
              <option value="">Select method</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Cash">Cash</option>
              <option value="Mobile Money">Mobile Money</option>
              <option value="Card">Card</option>
              <option value="Other">Other</option>
            </select>
            {errors.paymentMethod && (
              <p className="text-red-500 text-sm mt-1">{errors.paymentMethod.message}</p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="block text-navy font-semibold mb-2 font-body">
              Date *
            </label>
            <input
              type="date"
              className="input-field"
              {...register('date', { required: 'Date is required' })}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
            )}
          </div>

          {/* Month */}
          <div>
            <label className="block text-navy font-semibold mb-2 font-body">
              Month *
            </label>
            <select
              className="input-field"
              {...register('month', { required: 'Please select a month' })}
            >
              {Array.from({ length: plan.durationMonths }, (_, i) => i + 1).map(month => (
                <option key={month} value={month}>
                  Month {month} of {plan.durationMonths}
                </option>
              ))}
            </select>
            {errors.month && (
              <p className="text-red-500 text-sm mt-1">{errors.month.message}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Adding...' : 'Add Contribution'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContributionModal;
