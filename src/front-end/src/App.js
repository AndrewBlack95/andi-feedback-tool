import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LogInPage from './pages/LogInPage';
import SurveyPage from './pages/SurveyPage';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/home"><HomePage /></Route>
          <Route path="/survey"><SurveyPage /></Route>
          <Route path="/"><LogInPage /></Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
