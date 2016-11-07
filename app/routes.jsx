import React from 'react';
import {Route, browserHistory, IndexRoute} from 'react-router';
import MainComponent from '../app/main/MainComponent.jsx'

// Layouts
import App from './app.jsx';
export default (
  <Route component={App}>
    <Route path="/main" component={MainComponent}></Route>
    <Route path="*" component={MainComponent}></Route>
  </Route>
);
