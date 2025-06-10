import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "./pages/auth";
import RoleSelection from './pages/roleselection';
import CandidateSignup from './pages/candidatesignup';
import CandidateDashboard from "./pages/candidatedashboard";
import RecruiterSignup from './pages/recruitersignup';
import RecruiterDashboard from './pages/recruiterdashboard';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Auth} />
        <Route path="/role" component={RoleSelection} />
        <Route path="/candidate" component={CandidateSignup} />
        <Route path="/candidate-dashboard" component={CandidateDashboard} />
        <Route path="/recruiter" component={RecruiterSignup} />
        <Route path="/recruiter-dashboard" component={RecruiterDashboard} />  
      </Switch>
    </Router>
  );
}

export default App;