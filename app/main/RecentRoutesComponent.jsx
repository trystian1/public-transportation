import React from 'react';
import {connect} from 'react-redux';
import * as routeActions from '../actions/routeActions';
import InputComponent from '../components/InputComponent.jsx';
import RouteOptionComponent from '../components/RouteOptionComponent.jsx';
import {bindActionCreators} from 'redux'

class RecentRoutesComponent extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {

     var routes = this.props.recentRoutes;

      return(
        <div className={this.props.recentRoutesClass}>
          <h1 className="recent-route-title">{this.props.title}</h1>
          {routes.map((routeOption, i) =>
            <RouteOptionComponent
              activeStep={this.props.activeStep}
              showActiveRoute={this.props.showActiveRoute}
              routeOption={routeOption}
              routeKey={i}
              key={i}/>
          )}
        </div>
      );
    }
}

function mapStateToProps(state, ownProps) {
  return {
    route: state.route,
  };
}

export default connect(mapStateToProps)(RecentRoutesComponent);
