import React from 'react';
import {connect} from 'react-redux';

class DirectionStepComponent extends React.Component {

  constructor(props, context) {
    super(props, context);

  }
 render() {

   var isHidden = this.props.activeStep === this.props.routeKey ? '' : 'hidden',
       hiddenClass = this.props.step.transit ? '' : 'hidden',
       transit = {
             fromName: this.props.step.transit
              ? this.props.step.transit.departure_stop.name : '',
             toName: this.props.step.transit
              ? this.props.step.transit.arrival_stop.name : ''
           },
           line = {
             lineName: this.props.step.transit
              ? this.props.step.transit.line.name : '',
             lineShortName: this.props.step.transit
              ? this.props.step.transit.line.short_name : ''
           };

    return(
      <div className={isHidden}>
        <div className="step-wrap">
          <h2 className="instruction-title">{this.props.step.instructions} <span className={hiddenClass}><span className="line-name">{line.lineName} {line.lineShortName}</span></span> </h2>
          <div>{this.props.step.duration.text}</div>
          <div className={hiddenClass}>{transit.fromName} to {transit.toName} </div>

        </div>
      </div>
    );
  }
}


export default DirectionStepComponent;
