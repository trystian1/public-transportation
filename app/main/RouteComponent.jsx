import React from 'react';
import {connect} from 'react-redux';
import * as routeActions from '../actions/routeActions';
import InputComponent from '../components/InputComponent.jsx';
import RouteOptionsComponent from '../components/RouteOptionsComponent.jsx';
import {bindActionCreators} from 'redux'

class RouteComponent extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {

     var routes = this.props.directions.directions
        ? this.props.directions.directions
        : [];

      return(
        <div className="route">
          {routes.map((routeOptions, i) =>
            <RouteOptionsComponent
              activeStep={this.props.activeStep}
              showActiveRoute={this.props.showActiveRoute}
              routeOptions={routeOptions}
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

export default connect(mapStateToProps)(RouteComponent);
