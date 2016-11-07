import React from 'react';
import InputComponent from '../components/InputComponent.jsx';
import DateComponent from '../components/DateComponent.jsx';
import SwitchComponent from '../components/SwitchComponent.jsx';

class RouteForm extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

   render() {
     return(
       <div className="form">
         <InputComponent label="From:" placeholder="Aalsmeer" onChange={this.props.onChange} valueProp={this.props.travelData.from} name="from" dataListId="fromPlacesList"/>
         <InputComponent label="To:" placeholder="Amsterdam" onChange={this.props.onChange} valueProp={this.props.travelData.to} name="to" dataListId="toPlacesList"/>
         <div>
           <DateComponent label={this.props.componentData.dateLabel} onChange={this.props.onChange} valueProp={this.props.travelData.date} name="date" />
           <SwitchComponent label={this.props.componentData.arrivalLabel} notActiveLabel={this.props.componentData.notActiveArrivalLabel} onChange={this.props.onChange} valueProp={this.props.travelData.arrival} name="arrival" />
         </div>
         <div>
          <button onClick={this.props.getRoute}><span className="icon icon-rocket"></span>Plan Route</button>
        </div>
       </div>
     )
    }
}

export default RouteForm;
