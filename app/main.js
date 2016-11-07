import React from 'react';
import ReactDOM from 'react-dom'
import {Router, browserHistory} from 'react-router';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import routes from './routes.jsx';
import css from './styles/style.scss';

const store = configureStore();
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
  )
   // ...
});
