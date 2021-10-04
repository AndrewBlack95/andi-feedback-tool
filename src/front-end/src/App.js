import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import './App.css';

import HomePage from './pages/HomePage';
import LogInPage from './pages/LogInPage';
import SurveyPage from './pages/SurveyPage';
import AuthPage from './pages/AuthPage';

const App = () => {
  const [token, setToken] = useState(null);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [tags, setTags] = useState({});

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/home">
            {token ? <HomePage token={token} setToken={setToken} setSelectedSurvey={setSelectedSurvey} /> : <Redirect to="/" />}
          </Route>
          <Route path="/survey">
            {token ? <SurveyPage token={token} setToken={setToken} selectedSurvey={selectedSurvey} tags={tags} setTags={setTags} /> : <Redirect to="/" />}
          </Route>
          <Route path="/auth"><AuthPage token={token} setToken={setToken}/></Route>
          <Route path="/"><LogInPage />
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
