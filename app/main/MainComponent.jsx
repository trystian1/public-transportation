import React from 'react';
import {connect} from 'react-redux';
import * as routeActions from '../actions/routeActions';
import InputComponent from '../components/InputComponent.jsx';
import RouteComponent from '../main/RouteComponent.jsx';
import RouteForm from '../main/RouteForm.jsx';
import RecentRoutesComponent from '../main/RecentRoutesComponent.jsx';
import {bindActionCreators} from 'redux';
import moment from 'moment';

class MainComponent extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      activeStep: 0,
      travelData: {
        from: '',
        to: '',
        date: moment.utc(new Date()).local().format('YYYY-MM-DDThh:mm'),
        arrival: false,
      },
      componentData: {
        arrivalLabel: 'Departure',
        notActiveArrivalLabel: 'Arrival',
        dateLabel: 'Departure Time'
      }
    }
  }

  componentDidMount() {
    var _this = this,
        script = document.createElement('script');

    this.props.actions.getRecentRoutes();

    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBmcdFJ7TM1dmkPXieir6gUyGFyzGPgxDE&libraries=places&callback=initMap');
    document.getElementsByTagName('head')[0].appendChild(script);

    // google maps needs a callback
    window.initMap = () => {}

  }

  showActiveRoute(routeId) {
    this.state.activeRoute = routeId;
    this.setState({activeStep: routeId})
  }

  getRoute() {

    var routeParams = {
      from: this.state.travelData.from,
      to: this.state.travelData.to
    };

    if (this.state.travelData.arrival) {
      routeParams.arrivalTime = this.state.travelData.date;
    } else {
      routeParams.departureTime = this.state.travelData.date;
    }

    this.props.actions.getRoute(routeParams)

  }

  onChange(event) {

    if (event.target.name === 'arrival') {
      this.state.travelData[event.target.name] = event.target.checked;
    } else {
      this.state.travelData[event.target.name] = event.target.value;
    }

    this.setComponentData()

    this.setState({
      travelData: this.state.travelData,
      componentData: this.state.componentData
    });

  }

  setComponentData() {

      this.state.componentData.arrivalLabel =
        this.state.travelData.arrival ? 'Arival' : 'Departure';
      this.state.componentData.notActiveArrivalLabel =
        this.state.travelData.arrival ? 'Departure' : 'Arival';
      this.state.componentData.dateLabel =
        this.state.travelData.arrival ? 'Arival Time' : 'Departure Time';

  }

  render() {

      var message = this.props.route.loading ? 'Loading your route' : '',
          recentRoutes = this.props.route.recentRoutes
            ? this.props.route.recentRoutes : [],
          recentRoutesTitle = recentRoutes.length
            ? 'Recent Searches' : 'Plan your trip by searching',
          recentRoutesClass = this.props.route.directions ? 'hidden' : 'route';

      return(
        <div className="main-compontent">

            <RouteForm showActiveRoute={this.showActiveRoute}
              componentData={this.state.componentData}
              travelData={this.state.travelData}
              onChange={this.onChange.bind(this)}
              getRoute={this.getRoute.bind(this)}/>
            <RouteComponent
              showActiveRoute={this.showActiveRoute.bind(this)}
              activeStep={this.state.activeStep}
              directions={this.props.route} />
            <RecentRoutesComponent
              recentRoutesClass={recentRoutesClass}
              recentRoutes={recentRoutes}
              title = {recentRoutesTitle}
              showActiveRoute={this.showActiveRoute.bind(this)}
              activeStep={this.state.activeStep}
            />
            <div className="messageName">
              {message}
            </div>
        </div>
      );
  }
}

const mapStateToProps = (state, ownProps)  => {

  return {
    route: state.routes,
  }

}


const mapDispatchToProps = (dispatch) => {

  return {
    actions: bindActionCreators(routeActions, dispatch)
  }

}



export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
