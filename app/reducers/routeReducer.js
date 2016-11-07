import * as actionTypes from '../actions/actionTypes';

export default function routeReducer(state = {}, action) {

  switch(action.type) {
      case 'GET_ROUTE_SUCCES':
        return Object.assign({}, state, {
          directions: action.directions
        })
      case 'LOADING':
        return Object.assign({}, state, {
          loading: action.loading
        })
      case 'RECENT_ROUTES_SUCCESS':
        return Object.assign({}, state, {
          recentRoutes: action.recentRoutes
        })
      default:
        return state;
  }
}
