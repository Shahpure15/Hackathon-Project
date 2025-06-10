import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "./pages/auth";
import RoleSelection from './pages/roleselection';
import CandidateSignup from './pages/candidatesignup';
import CandidateDashboard from "./pages/candidatedashboard";
import RecruiterSignup from './pages/recruitersignup';
import RecruiterDashboard from './pages/recruiterdashboard';
import RecruiterProfile from './pages/recruiterprofile';
import Profile from './pages/profile.js';
import Resume from './pages/resume.js';
import ResumeBuilder from './services/resumebuilder.js'

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
        <Route path="/recruiter-profile" component={RecruiterProfile} />
        <Route path = "/Profile" component = {Profile}/>
        <Route path = "/Resume" component = {Resume}/>
        <Route path = "/ResumeBuilder" component = {ResumeBuilder}/>
      </Switch>
    </Router>
  );
}

export default App;