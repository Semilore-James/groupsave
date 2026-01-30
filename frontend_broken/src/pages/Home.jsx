import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PiggyBank, Users, Target, TrendingUp } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [planCode, setPlanCode] = useState('');

  const handleAccessPlan = (e) => {
    e.preventDefault();
    if (planCode.trim()) {
      navigate(`/plan/${planCode.trim()}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-5xl w-full animate-slide-up">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-coral/10 p-4 rounded-full animate-scale-in">
              <PiggyBank className="w-16 h-16 text-coral" strokeWidth={1.5} />
            </div>
          </div>
          
          <h1 className="text-6xl font-display font-bold text-navy mb-4 tracking-tight">
            GroupSave
          </h1>
          
          <p className="text-xl text-navy/70 font-body max-w-2xl mx-auto leading-relaxed">
            Save together, grow together. Track shared savings goals with clarity, 
            trust, and transparency—no complications, just progress.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Create Plan Card */}
          <div className="card p-8 group cursor-pointer animate-fade-in"
               onClick={() => navigate('/create')}
               style={{ animationDelay: '0.1s' }}>
            <div className="flex items-start space-x-4">
              <div className="bg-coral/10 p-3 rounded-xl group-hover:bg-coral/20 transition-colors">
                <Target className="w-8 h-8 text-coral" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-display font-semibold text-navy mb-2">
                  Start New Plan
                </h3>
                <p className="text-navy/60 font-body mb-4">
                  Create a shared savings goal with your friends. Set your target, 
                  invite participants, and start tracking together.
                </p>
                <button className="btn-primary w-full">
                  Create Savings Plan
                </button>
              </div>
            </div>
          </div>

          {/* Join Plan Card */}
          <div className="card p-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-start space-x-4">
              <div className="bg-navy/10 p-3 rounded-xl">
                <Users className="w-8 h-8 text-navy" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-display font-semibold text-navy mb-2">
                  Join Existing Plan
                </h3>
                <p className="text-navy/60 font-body mb-4">
                  Have a plan code? Enter it below to access your group's 
                  savings plan and log contributions.
                </p>
                <form onSubmit={handleAccessPlan}>
                  <input
                    type="text"
                    placeholder="Enter plan code (e.g., SAVE-A3B9)"
                    value={planCode}
                    onChange={(e) => setPlanCode(e.target.value.toUpperCase())}
                    className="input-field mb-3"
                  />
                  <button type="submit" className="btn-secondary w-full">
                    Access Plan
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="glass rounded-xl p-6 text-center">
            <div className="bg-coral/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-7 h-7 text-coral" strokeWidth={1.5} />
            </div>
            <h4 className="font-display font-semibold text-lg text-navy mb-2">
              Small Groups
            </h4>
            <p className="text-navy/60 text-sm font-body">
              Perfect for 2-5 people saving toward shared dreams
            </p>
          </div>

          <div className="glass rounded-xl p-6 text-center">
            <div className="bg-coral/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-7 h-7 text-coral" strokeWidth={1.5} />
            </div>
            <h4 className="font-display font-semibold text-lg text-navy mb-2">
              Track Progress
            </h4>
            <p className="text-navy/60 text-sm font-body">
              See contributions and watch your savings grow in real-time
            </p>
          </div>

          <div className="glass rounded-xl p-6 text-center">
            <div className="bg-coral/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-7 h-7 text-coral" strokeWidth={1.5} />
            </div>
            <h4 className="font-display font-semibold text-lg text-navy mb-2">
              Clear Goals
            </h4>
            <p className="text-navy/60 text-sm font-body">
              Set duration and keep everyone aligned on the timeline
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
