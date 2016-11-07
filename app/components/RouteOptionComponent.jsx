import React from 'react';
import {connect} from 'react-redux';
import DirectionStepComponent from './DirectionStepComponent.jsx';

class DirectionComponent extends React.Component {

  constructor(props, context) {
    super(props, context);

  }
 render() {

    var isActiveStep = this.props.routeKey === this.props.activeStep,
        topBarClass = isActiveStep ? 'active-top-bar' : 'inactive-top-bar',
        routeWrapClass = isActiveStep ? 'route-wrap' : 'inactive-route-wrap'

    return(
      <div className={routeWrapClass} data-route={this.props.routeKey} onClick={this.props.showActiveRoute.bind(null, this.props.routeKey)}>
        <div className={topBarClass}>
          <h1 className="top-bar-title">{this.props.routeOption.start_address} - {this.props.routeOption.end_address} </h1>
          <h2> <span className="travel-time"><span className="icon icon-datetime-clock"></span>{this.props.routeOption.duration.text}</span> <span className="time-frame">{this.props.routeOption.departure_time.text} - {this.props.routeOption.arrival_time.text}</span></h2>
        </div>
        {this.props.routeOption.steps.map((step, i) =>
          <DirectionStepComponent key={i} activeStep={this.props.activeStep} routeKey={this.props.routeKey} activeStep={this.props.activeStep} step={step}/>
        )}
      </div>
    );
  }
}


export default DirectionComponent;
