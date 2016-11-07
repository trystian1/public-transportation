import React from 'react';

class  DateInputComponent extends React.Component{

  render() {

    return(
      <div className="date-wrap">
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <div className="field">
          <input type='datetime-local'
            id={this.props.name}
            name={this.props.name}
            ref={this.props.name}
            value={this.props.valueProp}
            onChange={this.props.onChange} />
        </div>
        <div className="input-error">{this.props.error}</div>
      </div>
    )
  }
};

export default DateInputComponent;
