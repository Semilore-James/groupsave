import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Plus, X, Sparkles } from 'lucide-react';
import { createSavingsPlan } from '../services/api';

const CreatePlan = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [participants, setParticipants] = useState(['']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addParticipant = () => {
    if (participants.length < 5) {
      setParticipants([...participants, '']);
    }
  };

  const removeParticipant = (index) => {
    if (participants.length > 1) {
      setParticipants(participants.filter((_, i) => i !== index));
    }
  };

  const updateParticipant = (index, value) => {
    const updated = [...participants];
    updated[index] = value;
    setParticipants(updated);
  };

  const onSubmit = async (data) => {
    setError('');
    
    // Validate participants
    const validParticipants = participants.filter(p => p.trim() !== '');
    
    if (validParticipants.length < 2) {
      setError('You need at least 2 participants');
      return;
    }

    if (validParticipants.length > 5) {
      setError('Maximum 5 participants allowed');
      return;
    }

    setLoading(true);

    try {
      const planData = {
        planName: data.planName,
        participants: validParticipants,
        durationMonths: parseInt(data.durationMonths)
      };

      const response = await createSavingsPlan(planData);
      
      if (response.success) {
        navigate(`/plan/${response.plan.planCode}`, { 
          state: { isNew: true }
        });
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create plan. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <div className="max-w-2xl w-full animate-slide-up">
        {/* Header */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-navy/70 hover:text-navy mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="font-body">Back to Home</span>
        </button>

        <div className="card p-8">
          <div className="flex items-center mb-6">
            <div className="bg-coral/10 p-3 rounded-xl mr-4">
              <Sparkles className="w-6 h-6 text-coral" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-navy">
                Create Savings Plan
              </h1>
              <p className="text-navy/60 font-body">
                Set up your group's savings journey
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 animate-scale-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Plan Name */}
            <div>
              <label className="block text-navy font-semibold mb-2 font-body">
                Plan Name *
              </label>
              <input
                type="text"
                placeholder="e.g., Plot of Land - Phase 1"
                className="input-field"
                {...register('planName', { 
                  required: 'Plan name is required',
                  minLength: { value: 3, message: 'Name must be at least 3 characters' }
                })}
              />
              {errors.planName && (
                <p className="text-red-500 text-sm mt-1">{errors.planName.message}</p>
              )}
            </div>

            {/* Participants */}
            <div>
              <label className="block text-navy font-semibold mb-2 font-body">
                Participants * (2-5 people)
              </label>
              <div className="space-y-3">
                {participants.map((participant, index) => (
                  <div key={index} className="flex items-center space-x-2 animate-scale-in">
                    <input
                      type="text"
                      placeholder={`Participant ${index + 1} name`}
                      value={participant}
                      onChange={(e) => updateParticipant(index, e.target.value)}
                      className="input-field flex-1"
                    />
                    {participants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeParticipant(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              
              {participants.length < 5 && (
                <button
                  type="button"
                  onClick={addParticipant}
                  className="mt-3 flex items-center text-coral hover:text-coral/80 font-semibold transition-colors"
                >
                  <Plus className="w-5 h-5 mr-1" />
                  Add Participant
                </button>
              )}
            </div>

            {/* Duration */}
            <div>
              <label className="block text-navy font-semibold mb-2 font-body">
                Duration (Months) *
              </label>
              <input
                type="number"
                min="1"
                max="120"
                placeholder="e.g., 12"
                className="input-field"
                {...register('durationMonths', { 
                  required: 'Duration is required',
                  min: { value: 1, message: 'Duration must be at least 1 month' },
                  max: { value: 120, message: 'Duration cannot exceed 120 months' }
                })}
              />
              {errors.durationMonths && (
                <p className="text-red-500 text-sm mt-1">{errors.durationMonths.message}</p>
              )}
              <p className="text-navy/50 text-sm mt-2 font-body">
                How many months will this savings plan run?
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Plan...' : 'Create Savings Plan'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePlan;
