import React from 'react';
import RouteOptionComponent from './RouteOptionComponent.jsx'
import {connect} from 'react-redux';

class RouteOptionsComponent extends React.Component {

  constructor(props, context) {
    super(props, context);

  }
 render() {

    return(
      <div>
        {this.props.routeOptions.legs.map((routeOption, i) =>
          <RouteOptionComponent
            activeStep={this.props.activeStep}
            showActiveRoute={this.props.showActiveRoute}
            key={i}
            routeKey={this.props.routeKey}
            routeOption={routeOption}
            />
        )}
      </div>

    );
  }
}


export default RouteOptionsComponent;
