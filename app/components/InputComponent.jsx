import React from 'react';
import {connect} from 'react-redux';
import lodash from 'lodash';

class InputComponent extends React.Component {

  constructor(props, context) {
    super(props, context);

  }

  searchValue(evt) {

    var _this = this,
        value = evt.target.value,
        service = new google.maps.places.AutocompleteService();

    if (value) {
      service.getQueryPredictions({ input: value}, this.callback.bind(this));
    }

    this.props.onChange(evt);
  }

  callback(results, status) {
    var id = 0,
        optionsArray = [];

    _.each(results, function(result) {
      id++;

      optionsArray.push(
        {
          key: id,
          value: result.description,
          placeId: result.place_id
        }
      )
    });

    this.searchOptions = optionsArray;


  }

 render() {

   if (!this.searchOptions) {
     this.searchOptions = [{key: 1, value: 'Amsterdam'}];
    }

    return(
      <div className="input-compontent">
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <input
          value={this.props.valueProp}
          onChange={this.searchValue.bind(this)}
          name={this.props.name}
          list={this.props.dataListId}
          placeholder={this.props.placeholder}>
        </input>
          <datalist id={this.props.dataListId}>
          {this.searchOptions.map(searchOption =>
            <option key={searchOption.key} value={searchOption.value}/>
          )}
          </datalist>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {};
}


export default connect(mapStateToProps)(InputComponent);
