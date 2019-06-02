import { createBrowserHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import UserDetails from './component/UserDetails';
import UserPage from './component/UserPage';
import createStore from './store';

function App() {
  return (
    <Provider store={createStore()}>
      <Router history={createBrowserHistory()}>
        <Switch>
          <Route exact path="/" component={UserPage} />
          <Route path="/user/:id" component={UserDetails} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
