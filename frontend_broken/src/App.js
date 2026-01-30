import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreatePlan from './pages/CreatePlan';
import PlanDetail from './pages/PlanDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePlan />} />
        <Route path="/plan/:planCode" element={<PlanDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
