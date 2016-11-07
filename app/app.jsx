import React from 'react';
import {connect} from 'react-redux';
import MainComponent from '../app/main/MainComponent.jsx'

class App extends React.Component {

  constructor(props, context) {
    super(props, context);


  }

  componentDidMount() {
    this.registerServiceWorker();
  }

  registerServiceWorker() {
    navigator.serviceWorker.register('../sw.js').then(function(reg) {
    });

    fetch('./index.html').then(function() {

    })
  }


 render() {
    return(
    <div className="app">
        <div className="page-top">
          <h1 className="page-title"> <span className="icon icon-subway"></span><span className="icon icon-bus"></span>Public Transportation Planner</h1>
        </div>
        <main className="main">
          <MainComponent/>
        </main>
    </div>
    );
  }
}

App.PropTypes = {
}

function mapStateToProps(state, ownProps) {
  return {};
}


export default connect(mapStateToProps)(App);
