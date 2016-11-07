import React from 'react';

class  SwitchComponent extends React.Component{

  render() {

    return(
      <div className="switch-wrap">

        <div className="label-wrap">
          {this.props.label} <span className="not-active-label">{this.props.notActiveLabel}</span>
        </div>

        <label className="switch">
          <input type="checkbox"
           id={this.props.name}
           name={this.props.name}
           ref={this.props.name}
           defaultChecked={this.props.valueProp}
           value={this.props.valueProp}
           onChange={this.props.onChange}>
            </input>
         <div className="slider"></div>
        </label>

      </div>
    )
  }
};

export default SwitchComponent;
