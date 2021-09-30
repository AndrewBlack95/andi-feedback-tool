import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/HomePage';
import LogInPage from './pages/LogInPage';
import SurveyPage from './pages/SurveyPage';
import AuthPage from './pages/AuthPage';

const App = () => {
  const [token, setToken] = useState(null);
  const [selectedSurvey, setSelectedSurvey] = useState(null);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/home"><HomePage token={token} setToken={setToken} setSelectedSurvey={setSelectedSurvey} /></Route>
          <Route path="/survey"><SurveyPage setToken={setToken} selectedSurvey={selectedSurvey} /></Route>
          <Route path="/auth"><AuthPage token={token} setToken={setToken}/></Route>
          <Route path="/"><LogInPage /></Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
