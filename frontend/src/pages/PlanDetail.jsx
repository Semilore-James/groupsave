import React, { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Share2, Copy, Check, Plus, Users, Calendar, TrendingUp, CheckCircle2, X as XIcon } from 'lucide-react';
import { getSavingsPlan } from '../services/api';
import AddContributionModal from '../components/AddContributionModal';


const PlanDetail = () => {
  const { planCode } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isNewPlan] = useState(location.state?.isNew || false);


const fetchPlan = useCallback(async () => {
  try {
    const response = await getSavingsPlan(planCode);
    if (response.success) {
      setPlan(response.plan);
    }
    setLoading(false);
  } catch (err) {
    setError('Plan not found');
    setLoading(false);
  }
}, [planCode]); 

useEffect(() => {
  fetchPlan();
}, [fetchPlan]); 

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLink = `${window.location.origin}/plan/${planCode}`;

  const handleContributionAdded = async () => {
    setShowModal(false);
    await fetchPlan();
  };

  const currentMonth = plan ? Math.min(
    Math.floor((new Date() - new Date(plan.startDate)) / (30 * 24 * 60 * 60 * 1000)) + 1,
    plan.durationMonths
  ) : 1;

  const progressPercentage = plan ? (currentMonth / plan.durationMonths) * 100 : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-coral border-t-transparent mx-auto mb-4"></div>
          <p className="text-navy/60 font-body">Loading plan...</p>
        </div>
      </div>
    );
  }

  if (error || !plan) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="card p-8 max-w-md w-full text-center">
          <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <XIcon className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-display font-bold text-navy mb-2">
            Plan Not Found
          </h2>
          <p className="text-navy/60 font-body mb-6">
            The plan code you entered doesn't exist or has been removed.
          </p>
          <button onClick={() => navigate('/')} className="btn-primary w-full">
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-navy/70 hover:text-navy mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="font-body">Back to Home</span>
        </button>

        {/* New Plan Success Message */}
        {isNewPlan && (
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6 animate-scale-in">
            <div className="flex items-start">
              <CheckCircle2 className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-display font-semibold text-green-900 mb-2">
                  Plan Created Successfully!
                </h3>
                <p className="text-green-700 font-body mb-3">
                  Share the plan code or link below with your group members so they can access and contribute.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Plan Card */}
          <div className="lg:col-span-2 space-y-6">
            {/* Plan Header Card */}
            <div className="card p-8 animate-slide-up">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <h1 className="text-4xl font-display font-bold text-navy mr-4">
                      {plan.planName}
                    </h1>
                    {plan.status === 'completed' && (
                      <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
                        Completed
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-navy/60 font-body">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      <span>{plan.participants.length} participants</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      <span>Month {currentMonth} of {plan.durationMonths}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-navy/70 font-body">
                    Timeline Progress
                  </span>
                  <span className="text-sm font-semibold text-coral">
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Total Saved */}
              <div className="bg-gradient-to-br from-coral/10 to-orange-100/50 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-navy/60 font-body mb-1">Total Saved</p>
                    <p className="text-5xl font-display font-bold text-navy">
                      ₦{plan.totalSaved.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-coral/20 p-4 rounded-full">
                    <TrendingUp className="w-10 h-10 text-coral" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </div>

            {/* Contributions List */}
            <div className="card p-8 animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-semibold text-navy">
                  Contributions
                </h2>
                {plan.status === 'active' && (
                  <button
                    onClick={() => setShowModal(true)}
                    className="btn-primary flex items-center"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Contribution
                  </button>
                )}
              </div>

              {plan.contributions.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-navy/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-navy/40" />
                  </div>
                  <p className="text-navy/60 font-body">
                    No contributions yet. Be the first to contribute!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {[...plan.contributions].reverse().map((contribution, index) => (
                    <div
                      key={contribution._id}
                      className="bg-ice/50 rounded-lg p-4 flex items-center justify-between hover:bg-ice transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <span className="font-semibold text-navy mr-3">
                            {contribution.participantName}
                          </span>
                          <span className="text-sm text-navy/60 bg-white px-3 py-1 rounded-full">
                            Month {contribution.month}
                          </span>
                        </div>
                        <div className="text-sm text-navy/60 font-body">
                          <span>{contribution.paymentMethod}</span>
                          <span className="mx-2">•</span>
                          <span>{new Date(contribution.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-display font-bold text-coral">
                          ₦{contribution.amount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Share Card */}
            <div className="card p-6 animate-scale-in">
              <div className="flex items-center mb-4">
                <div className="bg-navy/10 p-2 rounded-lg mr-3">
                  <Share2 className="w-5 h-5 text-navy" />
                </div>
                <h3 className="text-lg font-display font-semibold text-navy">
                  Share Plan
                </h3>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-sm text-navy/60 font-body mb-1 block">
                    Plan Code
                  </label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={plan.planCode}
                      readOnly
                      className="input-field flex-1 font-mono text-lg font-bold"
                    />
                    <button
                      onClick={() => copyToClipboard(plan.planCode)}
                      className="ml-2 p-3 bg-navy text-white rounded-lg hover:bg-navy/90 transition-colors"
                    >
                      {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-navy/60 font-body mb-1 block">
                    Share Link
                  </label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={shareLink}
                      readOnly
                      className="input-field flex-1 text-sm"
                    />
                    <button
                      onClick={() => copyToClipboard(shareLink)}
                      className="ml-2 p-3 bg-navy text-white rounded-lg hover:bg-navy/90 transition-colors"
                    >
                      {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Participants Card */}
            <div className="card p-6 animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-lg font-display font-semibold text-navy mb-4">
                Participants
              </h3>
              <div className="space-y-2">
                {plan.participants.map((participant, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-ice/50 rounded-lg p-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-coral/20 flex items-center justify-center mr-3">
                      <span className="font-display font-bold text-coral">
                        {participant.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="font-body text-navy">{participant.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Plan Details Card */}
            <div className="card p-6 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-lg font-display font-semibold text-navy mb-4">
                Plan Details
              </h3>
              <div className="space-y-3 text-sm font-body">
                <div className="flex justify-between">
                  <span className="text-navy/60">Status</span>
                  <span className={`font-semibold ${
                    plan.status === 'active' ? 'text-green-600' : 'text-navy'
                  }`}>
                    {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-navy/60">Start Date</span>
                  <span className="text-navy font-semibold">
                    {new Date(plan.startDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-navy/60">Duration</span>
                  <span className="text-navy font-semibold">
                    {plan.durationMonths} months
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-navy/60">Contributions</span>
                  <span className="text-navy font-semibold">
                    {plan.contributions.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Contribution Modal */}
      {showModal && (
        <AddContributionModal
          plan={plan}
          currentMonth={currentMonth}
          onClose={() => setShowModal(false)}
          onSuccess={handleContributionAdded}
        />
      )}
    </div>
  );
};

export default PlanDetail;
